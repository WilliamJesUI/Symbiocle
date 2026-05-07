"""
Symbiocle - Matchmaking Engine (Supabase-compatible)
=====================================================
Uses column names from the RecyclingCompanies Supabase table:
  - recycling_company_id (primary key)
  - name (company name)
  - capacity (tons/month)
  - description, city, province, latitude, longitude
  - waste_category, accepted_materials, accepts_b3
"""

import pandas as pd
import math


def calculate_distance(lat1, lon1, lat2, lon2):
    """Haversine distance in km."""
    R = 6371
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def score_distance(distance_km, max_distance=2000):
    if distance_km >= max_distance:
        return 0.0
    return 1 - (distance_km / max_distance)


def score_capacity(factory_quantity, recycler_capacity):
    if recycler_capacity >= factory_quantity:
        return 1.0
    return recycler_capacity / factory_quantity


def score_material_match(factory_material, recycler_materials_str):
    if pd.isna(recycler_materials_str) or not recycler_materials_str:
        return 0.5
    accepted_list = [m.strip().lower() for m in str(recycler_materials_str).split(',')]
    factory_material_lower = factory_material.strip().lower()
    if factory_material_lower in accepted_list:
        return 1.0
    for accepted in accepted_list:
        if factory_material_lower in accepted or accepted in factory_material_lower:
            return 0.7
    return 0.0


def find_matches(factory, recyclers_df, top_n=3):
    """Returns top N recycler matches from Supabase data."""

    if len(recyclers_df) == 0:
        return []

    # FILTER: waste category match
    candidates = recyclers_df[
        recyclers_df['waste_category'] == factory['waste_category']
    ].copy()

    # Include 'mixed' recyclers as fallback
    mixed = recyclers_df[recyclers_df['waste_category'] == 'mixed'].copy()
    candidates = pd.concat([candidates, mixed]).drop_duplicates(subset='recycling_company_id')

    # B3 filter
    if factory.get('is_b3', False):
        if 'accepts_b3' in candidates.columns:
            candidates = candidates[candidates['accepts_b3'] == True]

    if len(candidates) == 0:
        return []

    # SCORE each candidate
    results = []
    for _, recycler in candidates.iterrows():
        distance = calculate_distance(
            factory['latitude'], factory['longitude'],
            recycler['latitude'], recycler['longitude']
        )

        dist_score = score_distance(distance)
        cap_score = score_capacity(
            factory['quantity_tons_month'],
            recycler['capacity']
        )
        mat_score = score_material_match(
            factory.get('material', ''),
            recycler.get('accepted_materials', '')
        )

        final_score = (
            0.35 * dist_score +
            0.30 * cap_score +
            0.35 * mat_score
        )

        results.append({
            'recycler_id': str(recycler['recycling_company_id']),
            'company_name': recycler['name'],
            'city': recycler.get('city', ''),
            'province': recycler.get('province', ''),
            'distance_km': round(distance, 2),
            'capacity_tons_month': int(recycler['capacity']),
            'accepted_materials': recycler.get('accepted_materials', ''),
            'description': recycler.get('description', ''),
            'scores': {
                'distance': round(dist_score, 3),
                'capacity': round(cap_score, 3),
                'material_match': round(mat_score, 3),
                'final': round(final_score, 3)
            }
        })

    results.sort(key=lambda x: x['scores']['final'], reverse=True)
    return results[:top_n]
