# 🌱 Symbiocle — Industrial Symbiosis Platform

> **IYREF Hackathon 2026 · Circular Economy & Waste Revolution**  
> Team Barrel Shifters — Universitas Indonesia

Symbiocle is a B2B platform connecting Indonesian factories with recyclers through AI-powered matchmaking — turning industrial waste into circular economy opportunities.

Check Symbiocle out in this website --> "https://symbiocle-eight.vercel.app"
Do not visit from this link ❌ "https://symbiocle-lqdat71s6-williamjesuis-projects.vercel.app/" ❌
---

## 📸 Demo Flow

1. Factory signs up → adds factory location → lists waste
2. AI matches factory waste with top 3 recyclers (scored by distance, capacity, material expertise)
3. Gemini AI generates human-readable explanations for each match
4. Factory connects with recycler → negotiates in chat → finalizes deal
5. Recycler dashboard shows incoming waste opportunities in real time

---

## 🏗️ Architecture

```
symbiocle/
├── symbiocle_frontend/     # Next.js 14 frontend
└── symbiocle_backend/      # Python FastAPI AI backend
```

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, shadcn/ui |
| Auth + Database | Supabase (PostgreSQL + Auth) |
| AI Backend | Python FastAPI |
| Matchmaking | Haversine scoring algorithm + Gemini 2.5 Flash |

---

## 🗄️ Database Schema (Supabase)

```
Company            — id (→ auth.users), name, npwp, account_type
Factory            — factory_id, owner_id (→ Company), factory_name, province, city, postcode
WasteListings      — id, factory_id (→ Factory), waste_category, material, quantity_tons_month, is_b3
Connections        — id, factory_id, recycling_company_id, status, created_at
RecyclingCompanies — recycling_company_id, name, capacity, city, province, latitude, longitude,
                     waste_category, accepted_materials, accepts_b3
```

---

## ⚙️ Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- Supabase account (free tier works)
- Google Gemini API key (free tier works)

### 1. Clone

```bash
git clone https://github.com/your-team/symbiocle.git
cd symbiocle
```

### 2. Frontend

```bash
cd symbiocle_frontend
npm install
```

Create `symbiocle_frontend/.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_AI_API_URL=http://localhost:8000
```

```bash
npm run dev
# → http://localhost:3000
```

### 3. Backend

```bash
cd symbiocle_backend

# Windows
python -m venv .venv && .venv\Scripts\activate

# Mac/Linux
python -m venv .venv && source .venv/bin/activate

pip install -r requirements.txt
```

Create `symbiocle_backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_role_key_here
GEMINI_API_KEY=your_gemini_key_here
```

```bash
uvicorn main:app --reload
# → http://localhost:8000
```

### 4. Supabase

- Run `DB_FIX.sql` in Supabase **SQL Editor**
- **Authentication → Providers → Email** → disable "Confirm email"

---

## 🤖 AI Matchmaking Algorithm

The `/match` endpoint scores each recycler with a weighted formula:

| Factor | Weight | Method |
|---|---|---|
| Material match | 35% | Exact/partial string match on `accepted_materials` |
| Distance | 35% | Haversine formula, penalizes distances > 2000 km |
| Capacity | 30% | Recycler capacity vs factory quantity ratio |

Gemini 2.5 Flash then generates a human-readable explanation for the top matches.

### Key API Endpoints

```
GET  /categories                            → list of waste categories
GET  /materials/{category}                  → materials in a category
GET  /locations/provinces                   → 34 Indonesian provinces
GET  /locations/cities/{province}           → cities in a province
GET  /locations/postcodes/{province}/{city} → postcodes
GET  /circular/{material}                   → circular economy outputs for a material
POST /match                                 → main AI matchmaking
```

---

## 👥 Team Barrel Shifters

| Name | Role |
|---|---|
| Rebecca | AI |
| Delitha | Frontend (Next.js) |
| Paramita | Research & Business |
| William | Backend |

---

## 📄 License

MIT — built for IYREF 2026
