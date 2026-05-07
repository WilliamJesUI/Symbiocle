from supabase import create_client, Client

SUPABASE_URL="https://zkjxqpsdlsyepdzhnrgf.supabase.co"
SUPABASE_KEY="sb_secret_RJDe7RKaG1fv9IdXsnqkGQ_5orZiduf"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

results = supabase.table('RecyclingCompanies').select('*').execute()
print(results)