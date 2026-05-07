"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/libs/Supabase';

const AI_API = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

type Match = {
  recycler_id: string;
  company_name: string;
  city: string;
  province: string;
  distance_km: number;
  capacity_tons_month: number;
  accepted_materials: string;
  scores: { final: number };
  ai_recommendation: string | null;
};

type WasteListing = {
  id: string;
  material: string;
  waste_category: string;
  quantity_tons_month: number;
  is_b3: boolean;
  factory_id: string;
};


export default function MatchingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wasteId = searchParams.get('wasteId');

  const [wasteListings, setWasteListings] = useState<WasteListing[]>([]);
  const [selectedWasteId, setSelectedWasteId] = useState<string>(wasteId || '');
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentWaste, setCurrentWaste] = useState<WasteListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<Set<string>>(new Set());

  // Load user's waste listings on mount
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/en/sign-in'); return; }

      // Get all factories for this user
      const { data: facs } = await supabase
        .from('Factory')
        .select('factory_id')
        .eq('owner_id', user.id);

      const factoryIds = (facs || []).map((f: any) => f.factory_id);
      if (factoryIds.length === 0) { setLoading(false); return; }

      // Get all waste listings for those factories
      const { data: wastes } = await supabase
        .from('WasteListings')
        .select('id, material, waste_category, quantity_tons_month, is_b3, factory_id')
        .in('factory_id', factoryIds);

      const list = (wastes || []) as WasteListing[];
      setWasteListings(list);

      // Auto-select first one if no specific wasteId given
      if (!selectedWasteId && list[0]) setSelectedWasteId(list[0].id);
      setLoading(false);
    };
    load();
  }, [router]);

  // When waste selection changes, fetch matches from AI backend
  useEffect(() => {
    if (!selectedWasteId) return;
    const findMatches = async () => {
      setMatching(true);
      setError(null);
      setMatches([]);

      try {
        // Get the waste details
        const waste = wasteListings.find(w => w.id === selectedWasteId);
        if (!waste) return;
        setCurrentWaste(waste);

        // Get the factory location for this waste
        const { data: factory } = await supabase
          .from('Factory')
          .select('province, city, postcode')
          .eq('factory_id', waste.factory_id)
          .single();

        if (!factory) throw new Error('Factory not found');

        // Call the AI backend
        const response = await fetch(`${AI_API}/match`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            waste_category: waste.waste_category,
            material: waste.material,
            quantity_tons_month: waste.quantity_tons_month,
            province: factory.province,
            city: factory.city,
            postcode: factory.postcode,
            is_b3: waste.is_b3,
            top_n: 3,
            use_ai: true,
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.detail || 'No matches found');
        }

        const data = await response.json();
        setMatches(data.matches || []);
      } catch (err: any) {
        setError(err.message || 'Failed to find matches');
      } finally {
        setMatching(false);
      }
    };
    findMatches();
  }, [selectedWasteId, wasteListings]);

  const handleConnect = async (recyclerId: string) => {
    if (!currentWaste) return;
    
    try {
      // Ubah "R027" jadi angka 27
      const numericRecyclerId = parseInt(recyclerId.replace(/\D/g, '')) || 0;

      // 1. Simpan koneksi ke Supabase
      const { data: newConnection, error: insertError } = await supabase
        .from('Connections')
        .insert({
          factory_id: currentWaste.factory_id,
          recycling_company_id: numericRecyclerId,
          status: 'pending',
        })
        .select() // Wajib ada untuk balikin ID yang baru dibuat
        .single();
      
      // 2. Cegat kalau ada error dari Supabase!
      if (insertError) {
        console.error('Connection save failed:', insertError);
        alert(`Gagal membuat koneksi di DB: ${insertError.message}`);
        return; // STOP DI SINI. Jangan pindah ke halaman chat!
      }

      // 3. Pastikan ID-nya benar-benar ada
      if (!newConnection || !newConnection.id) {
        alert('Gagal mendapatkan ID koneksi dari database.');
        return; // STOP DI SINI.
      }

      // 4. Sukses! Update UI dan pindah ke halaman Chat membawa ID
      setConnected(prev => new Set(prev).add(recyclerId));
      router.push(`/en/dashboard/chat?connectionId=${newConnection.id}`);

    } catch (err: any) {
      console.error("Catch error:", err);
      alert(err.message);
    }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFDF9] font-[family-name:var(--font-creato-display)]">
        <p className="text-sm font-bold text-slate-500">Loading...</p>
      </div>
    );
  }

  if (wasteListings.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFDF9] p-4 md:p-8 font-[family-name:var(--font-creato-display)]">
        <div className="mx-auto max-w-3xl">
          <button onClick={() => router.push('/en/dashboard')} className="mb-6 flex items-center text-sm font-bold text-slate-400 transition-colors hover:text-slate-600">
            <span className="mr-2 text-lg leading-none">←</span> Back to Dashboard
          </button>
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-black text-slate-800">No waste listings yet</h2>
            <p className="mt-2 text-sm font-medium text-slate-500">Add a waste listing first to find matching recyclers.</p>
            <button onClick={() => router.push('/en/sign-up/factory/add-waste')} className="mt-6 rounded-xl bg-[#608334] px-6 py-3 text-sm font-black text-white">+ Add waste listing</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFDF9] p-4 md:p-8 font-[family-name:var(--font-creato-display)]">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => router.push('/en/dashboard')} className="mb-6 flex items-center text-sm font-bold text-slate-400 transition-colors hover:text-slate-600">
          <span className="mr-2 text-lg leading-none">←</span> Back to Dashboard
        </button>

        {/* Waste selector — lets user pick which waste to match */}
        {wasteListings.length > 1 && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">Select waste to match</label>
            <select
              value={selectedWasteId}
              onChange={(e) => setSelectedWasteId(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-[#608334] focus:bg-white"
            >
              {wasteListings.map(w => (
                <option key={w.id} value={w.id}>{w.material} — {w.quantity_tons_month} tons</option>
              ))}
            </select>
          </div>
        )}

        <h1 className="mb-2 text-2xl font-black tracking-tight text-slate-800">
          Best matches for {currentWaste?.material || '...'}
        </h1>
        <p className="mb-8 text-sm font-medium text-slate-500">Based on location, capacity, and material expertise.</p>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        {matching && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#608334]/20 border-t-[#608334]"></div>
            <p className="mt-4 text-sm font-bold text-slate-500">AI is finding the best matches for you...</p>
          </div>
        )}

        {!matching && matches.length > 0 && (
          <div className="flex flex-col gap-6">
            {matches.map((match, i) => {
              const score = Math.round(match.scores.final * 100);
              const isBest = i === 0;
              const isConnected = connected.has(match.recycler_id);
              return (
                <div key={match.recycler_id} className={`rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${isBest ? 'border-[#608334] bg-white ring-1 ring-[#608334]/20' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-800">{match.company_name}</h3>
                        {isBest && <span className="rounded-md border border-[#CBDDB5] bg-[#F7FEEF] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#608334]">Best match</span>}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3 text-[11px] font-bold text-slate-500">
                        <span>📍 {match.city}, {match.province}</span>
                        <span>🚗 {match.distance_km.toFixed(1)} km away</span>
                        <span>📦 {match.capacity_tons_month} tons/month capacity</span>
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 text-slate-600">{match.accepted_materials.split(',')[0]}</span>
                      </div>
                    </div>
                    <span className={`text-2xl font-black ${isBest ? 'text-[#608334]' : score >= 70 ? 'text-amber-500' : 'text-slate-400'}`}>{score}%</span>
                  </div>

                  {match.ai_recommendation && (
                    <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs font-medium leading-relaxed text-slate-600">
                      {match.ai_recommendation}
                    </div>
                  )}

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handleConnect(match.recycler_id)}
                      disabled={isConnected}
                      className="flex-1 rounded-xl bg-slate-800 py-3 text-sm font-black text-white shadow-sm transition-all hover:bg-slate-700 active:scale-[0.98] disabled:opacity-50"
                    >
                      {isConnected ? '✓ Connected' : 'Connect & Discuss 💬'}
                    </button>
                    <button className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50">
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!matching && matches.length === 0 && !error && currentWaste && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-bold text-slate-500">No matching recyclers found for {currentWaste.material}</p>
          </div>
        )}
      </div>
    </div>
  );
}
