"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/Supabase';

const AI_API = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

const WASTE_CATEGORIES = [
  'Plastic', 'Paper', 'Metal', 'Textile', 'Organic', 'Hazardous'
];

type FactoryRow = {
  factory_id: string;
  factory_name: string;
  province: string | null;
  city: string | null;
};

export default function AddBranchStep() {
  const router = useRouter();

  const [branchName, setBranchName] = useState('');

  // ==========================================
  // STATE LOKASI DINAMIS — now from AI backend
  // ==========================================
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [postcodes, setPostcodes] = useState<string[]>([]);
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');

  const [selectedWastes, setSelectedWastes] = useState<string[]>([]);
  const [factories, setFactories] = useState<FactoryRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load provinces from AI backend on mount
  useEffect(() => {
    fetch(`${AI_API}/locations/provinces`)
      .then(r => r.json())
      .then(d => {
        const list = d.provinces || [];
        setProvinces(list);
        if (list[0]) setProvince(list[0]);
      })
      .catch(() => setError('Could not load provinces. Is the AI backend running on port 8000?'));
  }, []);

  // Load cities when province changes
  useEffect(() => {
    if (!province) return;
    fetch(`${AI_API}/locations/cities/${encodeURIComponent(province)}`)
      .then(r => r.json())
      .then(d => {
        const list = d.cities || [];
        setCities(list);
        setCity(list[0] || '');
      });
  }, [province]);

  // Load postcodes when city changes
  useEffect(() => {
    if (!province || !city) return;
    fetch(`${AI_API}/locations/postcodes/${encodeURIComponent(province)}/${encodeURIComponent(city)}`)
      .then(r => r.json())
      .then(d => {
        const list = d.postcodes || [];
        setPostcodes(list);
        setPostcode(list[0] || '');
      });
  }, [province, city]);

  // Load existing factories from Supabase
  useEffect(() => {
    const loadFactories = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('Factory')
        .select('factory_id, factory_name, province, city')
        .eq('owner_id', user.id);
      setFactories((data || []) as FactoryRow[]);
    };
    loadFactories();
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvince(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const toggleWaste = (waste: string) => {
    if (selectedWastes.includes(waste)) {
      setSelectedWastes(selectedWastes.filter(w => w !== waste));
    } else {
      setSelectedWastes([...selectedWastes, waste]);
    }
  };

  const handleAddFactory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName) return;
    setError(null);
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const { error: insertError } = await supabase
        .from('Factory')
        .insert({
          owner_id: user.id,
          factory_name: branchName,
          province,
          city,
          postcode: postcode || null,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Success — redirect to dashboard
      router.push('/en/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to add factory');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFDF9] px-4 py-10 font-[family-name:var(--font-creato-display)] md:py-16">
      <div className="mx-auto w-full max-w-3xl">
        
        <button 
          onClick={() => router.push('/en/dashboard')}
          className="mb-8 flex items-center text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
        >
          <span className="mr-2 text-lg leading-none">←</span> Back to Dashboard
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#CBDDB5] bg-[#F7FEEF] text-[#608334]">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">
              Register New Factory
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Add a new factory or branch location to start tracking its waste production.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleAddFactory} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Factory name / label</label>
              <input type="text" required value={branchName} onChange={(e) => setBranchName(e.target.value)} placeholder="e.g. Pabrik Surabaya Selatan" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20" />
              <span className="text-[10px] font-bold text-slate-400">Text input — a nickname to tell factories apart</span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Province</label>
                <select value={province} onChange={handleProvinceChange} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20">
                  {provinces.map(prov => <option key={prov} value={prov}>{prov}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">City / Kabupaten</label>
                <select value={city} onChange={handleCityChange} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20">
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Postcode</label>
                <select value={postcode} onChange={(e) => setPostcode(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20">
                  {postcodes.map(pc => <option key={pc} value={pc}>{pc}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Generated Waste Types</label>
              <div className="flex flex-wrap gap-2">
                {WASTE_CATEGORIES.map((waste) => {
                  const isSelected = selectedWastes.includes(waste);
                  return (
                    <button key={waste} type="button" onClick={() => toggleWaste(waste)} className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${isSelected ? 'border-[#608334] bg-[#608334] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:border-[#608334] hover:text-[#608334]'}`}>
                      {isSelected ? '✓ ' : '+ '}{waste}
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] font-bold text-slate-400">Select all that apply</span>
            </div>

            <button type="submit" disabled={submitting} className="mt-4 w-full rounded-xl bg-slate-800 py-4 text-sm font-black text-white shadow-sm transition-all hover:bg-slate-700 active:scale-[0.98] disabled:opacity-50">
              {submitting ? 'Adding...' : 'Add factory'}
            </button>
          </form>

          {/* SECTION: YOUR FACTORIES */}
          <div className="mt-12 border-t border-slate-100 pt-8">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Your factories:</h3>
            
            <div className="flex flex-col gap-3">
              {factories.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm font-medium text-slate-400">
                  No factories added yet.
                </div>
              ) : (
                factories.map((fac) => (
                  <div key={fac.factory_id} className="group flex flex-col justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-[#CBDDB5] hover:bg-white sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-800">{fac.factory_name}</span>
                        <span className="text-xs font-medium text-slate-500">{fac.city}, {fac.province}</span>
                      </div>
                    </div>
                    <button onClick={() => router.push(`/en/sign-up/factory/add-waste?factoryId=${fac.factory_id}`)} className="flex items-center text-xs font-bold text-[#608334] transition-colors hover:text-[#4d6929]">
                      Manage waste <span className="ml-1 text-lg leading-none">→</span>
                    </button>
                  </div>
                ))
              )}
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-400">List of added factories — click "Manage waste" to go to Step 3</p>
          </div>

        </div>
      </div>
    </div>
  );
}