"""
Symbiocle - AI Explanation Generator (Gemini version)
======================================================
Uses Google's Gemini API to turn raw matchmaking scores into
human-readable explanations for why a recycler is a good match.

Free tier: 1,500 requests/day on Gemini 2.5 Flash. Hackathon-friendly!
"""

import os
from google import genai
from dotenv import load_dotenv

# Load API key from .env file (keeps it out of code/git)
load_dotenv()

# Initialize the Gemini client (auto-reads GEMINI_API_KEY env var)
client = genai.Client()

# Model choice: Flash 2.5 = fastest + free tier. Perfect for short explanations.
MODEL = "gemini-2.5-flash"


def generate_match_explanation(factory: dict, match: dict) -> str:
    """
    Generate a 2-3 sentence explanation for why a recycler is a good match.

    Parameters
    ----------
    factory : dict
        The factory profile with waste_category, material, quantity, etc.
    match : dict
        A single match result from find_matches() (has scores, distance, company info)

    Returns
    -------
    str : Natural language explanation
    """
    # Build a clear, structured prompt for Gemini
    prompt = f"""You are an expert in industrial symbiosis and circular economy. A factory is looking for the best recycler to handle their waste.

FACTORY PROFILE:
- Waste type: {factory['material']} ({factory['waste_category']})
- Quantity: {factory['quantity_tons_month']} tons/month
- Hazardous (B3): {'Yes' if factory.get('is_b3') else 'No'}

RECYCLER MATCH:
- Company: {match['company_name']}
- Location: {match['city']}, {match['province']}
- Distance from factory: {match['distance_km']} km
- Capacity: {match['capacity_tons_month']} tons/month
- Accepts: {match['accepted_materials']}
- About: {match['description']}

MATCH SCORES (0-1 scale):
- Distance score: {match['scores']['distance']}
- Capacity score: {match['scores']['capacity']}
- Material match score: {match['scores']['material_match']}
- Final score: {match['scores']['final']}

Write a 2-3 sentence explanation in English for the factory owner explaining why this recycler is recommended. Be specific - reference real numbers (distance in km, capacity, material). Highlight the strongest reasons. Don't repeat info verbatim, synthesize it. Don't use markdown or lists, just plain conversational sentences."""

    # Call Gemini API
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    # Extract the text from the response
    return response.text.strip()


def enrich_matches_with_ai(factory: dict, matches: list) -> list:
    """
    Add an `ai_recommendation` field to each match in the list.

    If the API call fails (no key, network issue, etc.), the match still
    works - it just won't have the AI explanation. The matchmaking itself
    keeps working without the AI.
    """
    enriched = []
    for match in matches:
        try:
            explanation = generate_match_explanation(factory, match)
            match['ai_recommendation'] = explanation
        except Exception as e:
            # Graceful failure - log error but keep match data intact
            match['ai_recommendation'] = None
            match['ai_error'] = str(e)
        enriched.append(match)
    return enriched


# ============================================================
# Quick test (run this file directly to test the API)
# ============================================================
if __name__ == "__main__":
    # Example test data
    test_factory = {
        'waste_category': 'textile',
        'material': 'cotton_scrap',
        'quantity_tons_month': 500,
        'is_b3': False
    }

    test_match = {
        'company_name': 'Tekstil Daur Ulang Bandung',
        'city': 'Bandung',
        'province': 'Jawa Barat',
        'distance_km': 1.64,
        'capacity_tons_month': 600,
        'accepted_materials': 'cotton_scrap,polyester_scrap,fabric_waste',
        'description': 'Textile waste recycler producing recycled yarn and non-woven materials',
        'scores': {
            'distance': 0.999,
            'capacity': 1.0,
            'material_match': 1.0,
            'final': 1.0
        }
    }

    print("Testing Gemini API connection...")
    print("=" * 60)
    explanation = generate_match_explanation(test_factory, test_match)
    print(explanation)
    print("=" * 60)
    print("\nIf you saw an explanation above, your API is working!")
