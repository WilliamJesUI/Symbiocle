"""
Symbiocle - FastAPI Backend
============================
Exposes the matchmaking engine as an HTTP API.

To run:
    uvicorn main:app --reload

LOCATION INPUT (layered dropdown):
    The frontend uses these GET endpoints to populate dropdowns:
    1. GET /locations/provinces           -> list of provinces
    2. GET /locations/cities/{province}   -> cities in that province
    3. GET /locations/postcodes/{province}/{city}  -> postcodes in that city

    Then sends province + city + postcode to POST /match.
    The backend automatically resolves coordinates.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, model_validator
from typing import Optional
import pandas as pd

from matchmaking import find_matches
from locations import (
    get_provinces, get_cities, get_postcodes,
    resolve_coordinates, get_location_tree
)
from match_narrator import enrich_matches_with_ai
from circular_flows import get_recycled_outputs, get_all_output_industries

import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# FastAPI app setup
app = FastAPI(
    title="Symbiocle Matchmaking API",
    description="AI-powered industrial symbiosis matchmaking for Indonesian factories",
    version="1.0.0"
)

# CORS CONFIGURATION BLOCK
origins = [
    "http://localhost:3000",      # The standard Next.js local development port
    "http://127.0.0.1:3000",      # An alternative local development address
]

# if frontend is on a different port
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Allows requests from the addresses in the 'origins' list
    allow_credentials=True,      # Allows the frontend to send cookies/auth headers if needed
    allow_methods=["*"],         # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Allows all HTTP headers
)

# CONNECT TO SUPABASE
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# CORS: lets your Next.js frontend call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
try:
    response = supabase.table('RecyclingCompanies').select('*').execute()
    RECYCLERS_DF = pd.DataFrame(response.data)
    print(f"Success! Loaded {len(RECYCLERS_DF)} recyclers from Supabase.")
except Exception as e:
    print(f"Error loading from Supabase: {e}")
    RECYCLERS_DF = pd.DataFrame() # Prevents crash if database is empty

# Request Model: what frontend sends to /match
class FactoryRequest(BaseModel):
    waste_category: str = Field(..., example="plastic",
        description="Main waste category")
    material: str = Field(..., example="PET",
        description="Specific material name (e.g. PET, cotton_scrap, palm_shell)")
    quantity_tons_month: float = Field(..., gt=0, example=500,
        description="Waste output in tons per month")

    # Layered location (province -> city -> postcode)
    province: str = Field(..., example="Jawa Barat",
        description="Indonesian province name")
    city: str = Field(..., example="Bandung",
        description="City or Kabupaten name")
    postcode: Optional[str] = Field(None, example="40115",
        description="Postcode (optional but recommended for precision)")

    is_b3: bool = Field(False, example=False,
        description="Is this hazardous (B3) waste?")
    top_n: Optional[int] = Field(3, ge=1, le=10,
        description="Number of top matches to return")
    use_ai: bool = Field(True, example=True,
        description="If True, generate AI explanations for each match (uses Claude API)")

    # Auto-fill latitude/longitude from province/city/postcode
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    @model_validator(mode='after')
    def resolve_location(self):
        """Convert (province, city, postcode) -> (latitude, longitude)."""
        coords = resolve_coordinates(self.province, self.city, self.postcode)
        if coords is None:
            raise ValueError(
                f"Invalid location: '{self.province}' / '{self.city}' "
                f"/ postcode '{self.postcode}'. "
                f"Use /locations/* endpoints to find valid options."
            )
        self.latitude = coords["latitude"]
        self.longitude = coords["longitude"]
        return self


# ============================================================
# Endpoints
# ============================================================

@app.get("/")
def root():
    """Health check."""
    return {
        "status": "running",
        "service": "Symbiocle Matchmaking API",
        "recyclers_loaded": len(RECYCLERS_DF)
    }


# ----- Recycler / category info -----

@app.get("/recyclers")
def list_recyclers():
    """All recyclers (for displaying on a map or in a directory)."""
    return RECYCLERS_DF.to_dict(orient='records')


@app.get("/categories")
def list_categories():
    """All waste categories (for the waste-type dropdown)."""
    return {"categories": sorted(RECYCLERS_DF['waste_category'].unique().tolist())}

@app.get("/materials/{category}")
def list_materials(category: str):
    """
    Materials accepted by partner recyclers for a given category.
    Use this to populate the material dropdown AFTER the user picks a category.
    Only shows materials your partners actually accept - nothing else is valid.
    """
    filtered = RECYCLERS_DF[RECYCLERS_DF['waste_category'] == category]
    if filtered.empty:
        raise HTTPException(404, detail=f"Category '{category}' not found")

    materials = set()
    for row in filtered['accepted_materials']:
        for material in row.split(','):
            materials.add(material.strip())

    return {
        "category": category,
        "materials": sorted(materials),
        "recycler_count": len(filtered)
    }


# ----- Layered location dropdowns -----

@app.get("/locations/provinces")
def list_provinces():
    """LEVEL 1 dropdown: all provinces."""
    return {"provinces": get_provinces()}


@app.get("/locations/cities/{province}")
def list_cities(province: str):
    """LEVEL 2 dropdown: cities in a specific province."""
    cities = get_cities(province)
    if not cities:
        raise HTTPException(404, detail=f"Province '{province}' not found")
    return {"province": province, "cities": cities}


@app.get("/locations/postcodes/{province}/{city}")
def list_postcodes(province: str, city: str):
    """LEVEL 3 dropdown: postcodes in a specific city."""
    postcodes = get_postcodes(province, city)
    if not postcodes:
        raise HTTPException(404, detail=f"City '{city}' not found in '{province}'")
    return {"province": province, "city": city, "postcodes": postcodes}


@app.get("/locations/tree")
def location_tree():
    """
    Full hierarchical location data in one response.
    Useful if frontend wants to load everything once and filter client-side.
    """
    return get_location_tree()


# ----- The main matchmaking logic -----

@app.post("/match")
def match_factory(factory: FactoryRequest):
    """
    Main matchmaking endpoint.
    Send factory profile -> receive top N recycler matches.
    """
    factory_dict = factory.model_dump()

    # Pull out fields that aren't part of the matching algorithm
    top_n = factory_dict.pop('top_n', 3)
    use_ai = factory_dict.pop('use_ai', True)
    factory_dict.pop('province', None)
    factory_dict.pop('city', None)
    factory_dict.pop('postcode', None)

    try:
        # Ask Supabase for the live list of recyclers
        response = supabase.table('RecyclingCompanies').select('*').execute()
        
        # Convert it into the Pandas DataFrame your math engine needs!
        live_recyclers_df = pd.DataFrame(response.data)
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to fetch data from Supabase: {str(e)}"
        )

    matches = find_matches(factory_dict, RECYCLERS_DF, top_n=top_n)

    if not matches:
        raise HTTPException(
            status_code=404,
            detail=f"No matching recyclers found for '{factory.waste_category}'"
        )

    # Add AI-generated explanations to each match (optional)
    if use_ai:
        matches = enrich_matches_with_ai(factory_dict, matches)

    # Add closed-loop data: what happens AFTER recycling?
    circular = get_recycled_outputs(factory.material)

    return {
        "factory_input": {
            "waste_category": factory.waste_category,
            "material": factory.material,
            "quantity_tons_month": factory.quantity_tons_month,
            "location": {
                "province": factory.province,
                "city": factory.city,
                "postcode": factory.postcode,
                "latitude": factory.latitude,
                "longitude": factory.longitude,
            },
            "is_b3": factory.is_b3,
        },
        "match_count": len(matches),
        "matches": matches,
        "circular_economy": circular
    }


# ----- Closed-loop: recycled output → who needs it -----

@app.get("/circular/{material}")
def circular_flow(material: str):
    """
    Closed-loop recommendation: given a waste material, show what it
    can be recycled into and which industries need the output.
    
    This is the 'full circle' — waste becomes raw material.
    """
    flow = get_recycled_outputs(material)
    if not flow:
        raise HTTPException(
            404,
            detail=f"No recycling flow data for '{material}'. "
                   f"Check /circular/supported for valid materials."
        )

    return {
        "input_material": material,
        "recycled_outputs": flow["recycled_outputs"]
    }


@app.get("/circular/supported/list")
def supported_circular_materials():
    """List all materials that have known recycling flow data."""
    from circular_flows import get_supported_materials
    return {"materials": get_supported_materials()}
