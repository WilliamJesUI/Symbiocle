"""
Symbiocle - Circular Economy Knowledge Base
=============================================
Maps waste materials → recycled outputs → industries that need them.

RECCOMENDATION LOGIC :
  Factory waste → Recycler processes it → Output material → Which industry needs it?

Based on real industrial symbiosis research and Indonesian manufacturing context.

NOTE :
This should eventually be replaced with a proper database table that recyclers
can validate/update. For the hackathon MVP, this curated knowledge base covers
the most common material flows in Indonesian manufacturing.
"""

# Structure:
# MATERIAL_FLOWS[input_material] = {
#     "recycled_outputs": [
#         {
#             "output_name": "what the recycler produces",
#             "output_description": "brief explanation",
#             "target_industries": [
#                 {
#                     "industry": "who needs this",
#                     "use_case": "what they use it for",
#                     "demand_level": "high" | "medium" | "low"
#                 }
#             ]
#         }
#     ]
# }

MATERIAL_FLOWS = {
    # ========== PLASTIC ==========
    "PET": {
        "recycled_outputs": [
            {
                "output_name": "RPET flakes",
                "output_description": "Cleaned and shredded PET plastic flakes ready for reprocessing",
                "target_industries": [
                    {"industry": "Packaging manufacturer", "use_case": "New PET bottles and food containers", "demand_level": "high"},
                    {"industry": "Textile manufacturer", "use_case": "Polyester fiber for clothing and fabric", "demand_level": "high"},
                    {"industry": "Automotive parts", "use_case": "Interior fabric and insulation material", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Polyester fiber",
                "output_description": "Recycled PET converted into synthetic fiber yarn",
                "target_industries": [
                    {"industry": "Textile manufacturer", "use_case": "Clothing, uniforms, and fabric production", "demand_level": "high"},
                    {"industry": "Furniture manufacturer", "use_case": "Upholstery filling and fabric", "demand_level": "medium"},
                ]
            }
        ]
    },
    "HDPE": {
        "recycled_outputs": [
            {
                "output_name": "HDPE pellets",
                "output_description": "Recycled high-density polyethylene pellets",
                "target_industries": [
                    {"industry": "Pipe manufacturer", "use_case": "Water and drainage pipes", "demand_level": "high"},
                    {"industry": "Packaging manufacturer", "use_case": "Bottles, containers, and jerry cans", "demand_level": "high"},
                    {"industry": "Construction", "use_case": "Geomembrane and plastic lumber", "demand_level": "medium"},
                ]
            }
        ]
    },
    "PP": {
        "recycled_outputs": [
            {
                "output_name": "Recycled PP granules",
                "output_description": "Polypropylene granules from recycled plastic waste",
                "target_industries": [
                    {"industry": "Automotive parts", "use_case": "Bumpers, dashboards, and interior components", "demand_level": "high"},
                    {"industry": "Household goods manufacturer", "use_case": "Storage containers, furniture, and appliances", "demand_level": "medium"},
                    {"industry": "Packaging manufacturer", "use_case": "Food containers and bottle caps", "demand_level": "medium"},
                ]
            }
        ]
    },
    "LDPE": {
        "recycled_outputs": [
            {
                "output_name": "Recycled LDPE film",
                "output_description": "Low-density polyethylene pellets for film production",
                "target_industries": [
                    {"industry": "Packaging manufacturer", "use_case": "Plastic bags, stretch wrap, and agricultural film", "demand_level": "high"},
                    {"industry": "Construction", "use_case": "Vapor barriers and protective sheeting", "demand_level": "low"},
                ]
            }
        ]
    },
    "mixed_plastic": {
        "recycled_outputs": [
            {
                "output_name": "Plastic lumber",
                "output_description": "Mixed recycled plastic formed into structural boards",
                "target_industries": [
                    {"industry": "Construction", "use_case": "Fencing, decking, and park benches", "demand_level": "medium"},
                    {"industry": "Furniture manufacturer", "use_case": "Outdoor furniture and playground equipment", "demand_level": "medium"},
                ]
            }
        ]
    },
    "plastic_film": {
        "recycled_outputs": [
            {
                "output_name": "Recycled film pellets",
                "output_description": "Pelletized recycled plastic film material",
                "target_industries": [
                    {"industry": "Packaging manufacturer", "use_case": "New plastic film and bags", "demand_level": "high"},
                    {"industry": "Agriculture", "use_case": "Mulch film and greenhouse covers", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== TEXTILE ==========
    "cotton_scrap": {
        "recycled_outputs": [
            {
                "output_name": "Recycled yarn",
                "output_description": "Regenerated cotton fiber spun into new yarn",
                "target_industries": [
                    {"industry": "Textile manufacturer", "use_case": "New fabric and clothing production", "demand_level": "high"},
                    {"industry": "Home textile producer", "use_case": "Towels, bed linens, and curtains", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Non-woven fabric",
                "output_description": "Pressed fiber sheets for industrial and consumer use",
                "target_industries": [
                    {"industry": "Automotive manufacturer", "use_case": "Sound insulation and interior padding", "demand_level": "high"},
                    {"industry": "Construction", "use_case": "Insulation material and geotextile", "demand_level": "medium"},
                    {"industry": "Medical supplies", "use_case": "Disposable medical textiles", "demand_level": "medium"},
                ]
            }
        ]
    },
    "polyester_scrap": {
        "recycled_outputs": [
            {
                "output_name": "Recycled polyester fiber",
                "output_description": "Regenerated polyester staple fiber",
                "target_industries": [
                    {"industry": "Textile manufacturer", "use_case": "Blended fabric production", "demand_level": "high"},
                    {"industry": "Filling manufacturer", "use_case": "Pillow and cushion stuffing", "demand_level": "medium"},
                ]
            }
        ]
    },
    "fabric_waste": {
        "recycled_outputs": [
            {
                "output_name": "Industrial wiping cloths",
                "output_description": "Cut and cleaned fabric scraps for industrial cleaning use",
                "target_industries": [
                    {"industry": "Manufacturing (general)", "use_case": "Machine cleaning and maintenance rags", "demand_level": "high"},
                    {"industry": "Automotive workshop", "use_case": "Workshop cleaning cloths", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Fiber fill material",
                "output_description": "Shredded mixed fabric for stuffing applications",
                "target_industries": [
                    {"industry": "Furniture manufacturer", "use_case": "Cushion and mattress filling", "demand_level": "medium"},
                ]
            }
        ]
    },
    "denim": {
        "recycled_outputs": [
            {
                "output_name": "Recycled denim insulation",
                "output_description": "Shredded denim processed into thermal insulation panels",
                "target_industries": [
                    {"industry": "Construction", "use_case": "Building insulation (eco-friendly alternative)", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Recycled cotton fiber",
                "output_description": "Denim broken down into raw cotton fiber for re-spinning",
                "target_industries": [
                    {"industry": "Textile manufacturer", "use_case": "Blended yarn production", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== METAL ==========
    "steel": {
        "recycled_outputs": [
            {
                "output_name": "Recycled steel billets",
                "output_description": "Melted and reformed steel ingots ready for manufacturing",
                "target_industries": [
                    {"industry": "Construction", "use_case": "Structural steel, rebar, and beams", "demand_level": "high"},
                    {"industry": "Automotive manufacturer", "use_case": "Vehicle body panels and chassis", "demand_level": "high"},
                    {"industry": "Shipbuilding", "use_case": "Hull plating and structural components", "demand_level": "medium"},
                ]
            }
        ]
    },
    "aluminum": {
        "recycled_outputs": [
            {
                "output_name": "Recycled aluminum ingots",
                "output_description": "Re-smelted aluminum ready for casting or extrusion",
                "target_industries": [
                    {"industry": "Packaging manufacturer", "use_case": "Beverage cans and food containers", "demand_level": "high"},
                    {"industry": "Automotive manufacturer", "use_case": "Engine blocks and body panels", "demand_level": "high"},
                    {"industry": "Electronics manufacturer", "use_case": "Device casings and heat sinks", "demand_level": "medium"},
                ]
            }
        ]
    },
    "copper": {
        "recycled_outputs": [
            {
                "output_name": "Recycled copper rod",
                "output_description": "Refined copper wire rod from recycled sources",
                "target_industries": [
                    {"industry": "Electrical cable manufacturer", "use_case": "Power and communication cables", "demand_level": "high"},
                    {"industry": "Electronics manufacturer", "use_case": "Circuit boards and connectors", "demand_level": "high"},
                ]
            }
        ]
    },
    "scrap_metal": {
        "recycled_outputs": [
            {
                "output_name": "Mixed metal feedstock",
                "output_description": "Sorted and shredded mixed metals for smelting",
                "target_industries": [
                    {"industry": "Steel mill", "use_case": "Raw material input for steel production", "demand_level": "high"},
                    {"industry": "Foundry", "use_case": "Casting of metal components", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== ORGANIC ==========
    "palm_shell": {
        "recycled_outputs": [
            {
                "output_name": "Biomass fuel pellets",
                "output_description": "Compressed palm shell for use as solid biofuel",
                "target_industries": [
                    {"industry": "Power plant", "use_case": "Biomass electricity generation", "demand_level": "high"},
                    {"industry": "Cement manufacturer", "use_case": "Alternative kiln fuel (co-processing)", "demand_level": "high"},
                    {"industry": "Industrial boiler operator", "use_case": "Steam generation for manufacturing", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Activated carbon",
                "output_description": "High-grade activated carbon from carbonized palm shell",
                "target_industries": [
                    {"industry": "Water treatment plant", "use_case": "Water purification and filtration", "demand_level": "high"},
                    {"industry": "Gold mining", "use_case": "Gold extraction process (carbon-in-pulp)", "demand_level": "medium"},
                ]
            }
        ]
    },
    "palm_fiber": {
        "recycled_outputs": [
            {
                "output_name": "Fiber board",
                "output_description": "Pressed palm fiber boards for construction",
                "target_industries": [
                    {"industry": "Construction", "use_case": "Interior wall panels and ceiling boards", "demand_level": "medium"},
                    {"industry": "Furniture manufacturer", "use_case": "Eco-friendly furniture panels", "demand_level": "medium"},
                ]
            }
        ]
    },
    "POME": {
        "recycled_outputs": [
            {
                "output_name": "Biogas (methane)",
                "output_description": "Methane gas captured from anaerobic digestion of palm oil mill effluent",
                "target_industries": [
                    {"industry": "Power plant", "use_case": "Biogas electricity generation", "demand_level": "high"},
                    {"industry": "Palm oil mill (self-use)", "use_case": "On-site energy for mill operations", "demand_level": "high"},
                ]
            },
            {
                "output_name": "Organic fertilizer",
                "output_description": "Nutrient-rich sludge from treated POME",
                "target_industries": [
                    {"industry": "Palm oil plantation", "use_case": "Soil amendment and fertilization", "demand_level": "high"},
                    {"industry": "Agriculture (general)", "use_case": "Organic crop fertilizer", "demand_level": "medium"},
                ]
            }
        ]
    },
    "food_waste": {
        "recycled_outputs": [
            {
                "output_name": "Compost",
                "output_description": "Organic compost from decomposed food waste",
                "target_industries": [
                    {"industry": "Agriculture", "use_case": "Soil enrichment and crop fertilization", "demand_level": "high"},
                    {"industry": "Landscaping", "use_case": "Garden and park maintenance", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Animal feed supplement",
                "output_description": "Processed food waste suitable for livestock consumption",
                "target_industries": [
                    {"industry": "Livestock farming", "use_case": "Supplementary animal feed", "demand_level": "medium"},
                    {"industry": "Aquaculture", "use_case": "Fish feed ingredient", "demand_level": "low"},
                ]
            }
        ]
    },
    "coffee_grounds": {
        "recycled_outputs": [
            {
                "output_name": "Bio-fertilizer",
                "output_description": "Nitrogen-rich organic fertilizer from coffee grounds",
                "target_industries": [
                    {"industry": "Agriculture", "use_case": "Organic crop fertilization", "demand_level": "medium"},
                    {"industry": "Urban farming", "use_case": "Community garden soil amendment", "demand_level": "low"},
                ]
            },
            {
                "output_name": "Biodiesel feedstock",
                "output_description": "Oil extracted from spent coffee grounds for biofuel production",
                "target_industries": [
                    {"industry": "Biofuel producer", "use_case": "Biodiesel blending and production", "demand_level": "low"},
                ]
            }
        ]
    },
    "rice_husk": {
        "recycled_outputs": [
            {
                "output_name": "Rice husk ash (RHA)",
                "output_description": "Silica-rich ash from burning rice husks, used as pozzolanic material",
                "target_industries": [
                    {"industry": "Cement manufacturer", "use_case": "Supplementary cementitious material", "demand_level": "high"},
                    {"industry": "Steel foundry", "use_case": "Insulating material for molten metal", "demand_level": "medium"},
                ]
            },
            {
                "output_name": "Biomass fuel",
                "output_description": "Rice husk briquettes for energy generation",
                "target_industries": [
                    {"industry": "Power plant", "use_case": "Biomass co-firing for electricity", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== PAPER ==========
    "cardboard": {
        "recycled_outputs": [
            {
                "output_name": "Recycled kraft paper",
                "output_description": "Brown paper made from recycled cardboard pulp",
                "target_industries": [
                    {"industry": "Packaging manufacturer", "use_case": "Corrugated boxes and shipping cartons", "demand_level": "high"},
                    {"industry": "E-commerce company", "use_case": "Product packaging and void fill", "demand_level": "high"},
                ]
            }
        ]
    },
    "mixed_paper": {
        "recycled_outputs": [
            {
                "output_name": "Recycled pulp",
                "output_description": "De-inked and processed paper pulp for new paper production",
                "target_industries": [
                    {"industry": "Paper mill", "use_case": "Newsprint and office paper production", "demand_level": "medium"},
                    {"industry": "Tissue manufacturer", "use_case": "Toilet paper and tissue production", "demand_level": "medium"},
                ]
            }
        ]
    },
    "office_paper": {
        "recycled_outputs": [
            {
                "output_name": "High-grade recycled pulp",
                "output_description": "Premium de-inked pulp suitable for white paper production",
                "target_industries": [
                    {"industry": "Paper mill", "use_case": "Office paper and printing paper", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== INDUSTRIAL BYPRODUCT ==========
    "fly_ash": {
        "recycled_outputs": [
            {
                "output_name": "Cement additive",
                "output_description": "Fly ash as pozzolanic material mixed into cement",
                "target_industries": [
                    {"industry": "Cement manufacturer", "use_case": "Portland pozzolan cement (PPC) production", "demand_level": "high"},
                    {"industry": "Concrete manufacturer", "use_case": "High-performance concrete mix", "demand_level": "high"},
                    {"industry": "Road construction", "use_case": "Soil stabilization and road base", "demand_level": "medium"},
                ]
            }
        ]
    },
    "slag": {
        "recycled_outputs": [
            {
                "output_name": "Slag cement (GGBFS)",
                "output_description": "Ground granulated blast furnace slag for cement blending",
                "target_industries": [
                    {"industry": "Cement manufacturer", "use_case": "Blended cement production", "demand_level": "high"},
                    {"industry": "Road construction", "use_case": "Aggregate and road base material", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== GLASS ==========
    "clear_glass": {
        "recycled_outputs": [
            {
                "output_name": "Glass cullet",
                "output_description": "Crushed and cleaned glass ready for re-melting",
                "target_industries": [
                    {"industry": "Glass bottle manufacturer", "use_case": "New glass bottles and jars", "demand_level": "high"},
                    {"industry": "Fiberglass manufacturer", "use_case": "Fiberglass insulation production", "demand_level": "medium"},
                ]
            }
        ]
    },
    "colored_glass": {
        "recycled_outputs": [
            {
                "output_name": "Colored glass cullet",
                "output_description": "Sorted colored glass fragments for specialty glass production",
                "target_industries": [
                    {"industry": "Glass bottle manufacturer", "use_case": "Colored glass bottles", "demand_level": "medium"},
                    {"industry": "Tile manufacturer", "use_case": "Decorative glass tiles and mosaic", "demand_level": "low"},
                ]
            }
        ]
    },

    # ========== RUBBER ==========
    "tire": {
        "recycled_outputs": [
            {
                "output_name": "Crumb rubber",
                "output_description": "Granulated rubber from shredded tires",
                "target_industries": [
                    {"industry": "Road construction", "use_case": "Rubberized asphalt for roads", "demand_level": "high"},
                    {"industry": "Sports facility", "use_case": "Athletic track and playground surfaces", "demand_level": "medium"},
                    {"industry": "Cement manufacturer", "use_case": "Alternative fuel (tire-derived fuel)", "demand_level": "medium"},
                ]
            }
        ]
    },
    "rubber_scrap": {
        "recycled_outputs": [
            {
                "output_name": "Reclaimed rubber",
                "output_description": "Devulcanized rubber compound for reuse",
                "target_industries": [
                    {"industry": "Rubber goods manufacturer", "use_case": "Mats, gaskets, and hoses", "demand_level": "medium"},
                    {"industry": "Footwear manufacturer", "use_case": "Shoe soles and sandals", "demand_level": "medium"},
                ]
            }
        ]
    },

    # ========== ELECTRONIC ==========
    "circuit_board": {
        "recycled_outputs": [
            {
                "output_name": "Recovered precious metals",
                "output_description": "Gold, silver, palladium, and copper extracted from PCBs",
                "target_industries": [
                    {"industry": "Electronics manufacturer", "use_case": "Component manufacturing and plating", "demand_level": "high"},
                    {"industry": "Jewelry manufacturer", "use_case": "Recycled gold and silver for jewelry", "demand_level": "low"},
                ]
            }
        ]
    },
    "battery": {
        "recycled_outputs": [
            {
                "output_name": "Recovered lithium and cobalt",
                "output_description": "Critical minerals extracted from spent batteries",
                "target_industries": [
                    {"industry": "Battery manufacturer", "use_case": "New battery cell production", "demand_level": "high"},
                    {"industry": "EV manufacturer", "use_case": "Electric vehicle battery packs", "demand_level": "high"},
                ]
            }
        ]
    },
}


# ============================================================
# Helper Functions
# ============================================================

def get_recycled_outputs(material: str) -> dict | None:
    """
    Given a waste material, return what it can be recycled into
    and which industries need the output.
    Returns None if material not found.
    """
    return MATERIAL_FLOWS.get(material)


def get_all_output_industries(material: str) -> list:
    """
    Flat list of all industries that could use the recycled output
    from a given waste material.
    """
    flow = MATERIAL_FLOWS.get(material)
    if not flow:
        return []

    industries = []
    for output in flow["recycled_outputs"]:
        for target in output["target_industries"]:
            industries.append({
                "output_name": output["output_name"],
                "industry": target["industry"],
                "use_case": target["use_case"],
                "demand_level": target["demand_level"],
            })
    return industries


def get_supported_materials() -> list:
    """Return all materials that have known recycling flows."""
    return sorted(MATERIAL_FLOWS.keys())
