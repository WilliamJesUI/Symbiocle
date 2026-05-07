# Symbiocle - AI Matchmaking Backend

AI-powered matchmaking module for **Symbiocle** — connects Indonesian factories with the right recycling companies using algorithmic scoring + Google Gemini AI explanations.

## Files

- `recyclers.csv` — Mock database of 30 recycling companies
- `locations.py` — Indonesian admin data: 34 provinces / 105 cities / ~478 postcodes
- `matchmaking.py` — Algorithm: filter → score → rank
- `match_narrator.py` — Google Gemini integration for human-readable match reasoning
- `main.py` — FastAPI server tying it all together
- `.env` — API key
- `requirements.txt` — Python dependencies

## Setup

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Get your Gemini API key 
1. Go to https://aistudio.google.com/
2. Sign in with any Google account
3. Click **"Get API Key"** → **"Create API key"** → select "Default Gemini Project"
4. Copy the key (starts with `AIzaSy...`)

### 3. Configure your key
```bash
cp .env
```

Then open `.env` in any text editor and replace the placeholder with your real key:
```
GEMINI_API_KEY=AIzaSy-your-actual-key-here
```

### 4. Test the AI alone
```bash
python ai_explainer.py
```
Should print a 2-3 sentence explanation. If it works, the API connection is good.

### 5. Run the server
```bash
uvicorn main:app --reload
```
Open http://localhost:8000/docs to test every endpoint interactively.

## API Endpoints

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/categories` | List of waste categories |
| GET | `/materials/{category}` | Materials accepted in that category |
| GET | `/recyclers` | All recyclers in the database |
| GET | `/locations/provinces` | All provinces |
| GET | `/locations/cities/{province}` | Cities in a province |
| GET | `/locations/postcodes/{province}/{city}` | Postcodes in a city |
| GET | `/locations/tree` | Full hierarchy (load once on frontend) |
| POST | `/match` | The main matchmaking endpoint |

## Sample request to /match

```json
{
  "waste_category": "textile",
  "material": "cotton_scrap",
  "quantity_tons_month": 500,
  "province": "Jawa Barat",
  "city": "Bandung",
  "postcode": "40115",
  "is_b3": false,
  "top_n": 3,
  "use_ai": true
}
```

The `use_ai` flag turns AI explanations on/off. Set to `false` to skip the API call (faster, useful when testing).

## Sample response

```json
{
  "factory_input": { ... },
  "match_count": 3,
  "matches": [
    {
      "company_name": "Tekstil Daur Ulang Bandung",
      "city": "Bandung",
      "distance_km": 1.64,
      "scores": {
        "distance": 0.999,
        "capacity": 1.0,
        "material_match": 1.0,
        "final": 1.0
      },
      "ai_recommendation": "This is your strongest match. Tekstil Daur Ulang Bandung is just 1.6 km from your factory and specializes in cotton textile recycling — a perfect fit for your 500 tons/month..."
    }
  ]
}
```

## How it works

1. **Algorithmic scoring** (`matchmaking.py`): Filter by category, score on distance/capacity/material match, return top N.
2. **AI explanation** (`ai_explainer.py`): For each top match, call Gemini API with structured data → get a natural-language reasoning back.
3. **Combined result** (`main.py`): Returns both the numbers AND the AI reasoning in one JSON.

## Graceful failure

If the Gemini API fails (no key, no internet, rate limit), the matchmaking still works — only the `ai_recommendation` field is missing. Your demo never breaks because of an API issue.
