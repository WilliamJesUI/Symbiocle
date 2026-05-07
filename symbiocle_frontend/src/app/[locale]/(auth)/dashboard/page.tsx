"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/Supabase';

const AI_API = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

type Company = { id: string; name: string };
type WasteRow = { id: string; material: string; quantity_tons_month: number; waste_category: string; is_b3: boolean };
type FactoryRow = {
  factory_id: string;
  factory_name: string;
  province: string | null;
  city: string | null;
  WasteListings: WasteRow[];
};

type RecommendedMaterial = {
  name: string;
  estimatedPrice: string;
  trend: string;
  fromMaterial: string;
};

type Connection = {
  id: number;
  factory_id: string;
  status: string;
  created_at: string;
  Factory?: { factory_name: string; city: string | null } | null;
};

export default function DashboardIndexPage() {
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [factories, setFactories] = useState<FactoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFacId, setExpandedFacId] = useState<string | null>(null);
  
  const [recommended, setRecommended] = useState<RecommendedMaterial[]>([]);
  const [pendingConnections, setPendingConnections] = useState<Connection[]>([]);
  const [pastConnections, setPastConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/en/sign-in'); return; }

      const { data: co } = await supabase.from('Company').select('id, name').eq('id', user.id).single();
      setCompany(co as Company);

      const { data: facs } = await supabase
        .from('Factory')
        .select(`factory_id, factory_name, province, city, WasteListings ( id, material, quantity_tons_month, waste_category, is_b3 )`)
        .eq('owner_id', user.id);
      const factoriesData = (facs || []) as FactoryRow[];
      setFactories(factoriesData);

      // Build "Recommended Recycled Materials" from AI circular flow data
      const uniqueMaterials = [...new Set(factoriesData.flatMap(f => f.WasteListings.map(w => w.material)))];
      const recs: RecommendedMaterial[] = [];
      for (const material of uniqueMaterials.slice(0, 4)) {
        try {
          const r = await fetch(`${AI_API}/circular/${encodeURIComponent(material)}`);
          if (r.ok) {
            const d = await r.json();
            const firstOutput = d.recycled_outputs?.[0];
            if (firstOutput) {
              const highestDemand = firstOutput.target_industries?.find((t: any) => t.demand_level === 'high');
              const trend = highestDemand ? 'Demand Naik' : 'Stabil';
              // Estimated price based on material type
              const priceMap: Record<string, string> = {
                'cotton_scrap': 'Rp 18.500',
                'PET': 'Rp 12.000',
                'HDPE': 'Rp 9.500',
                'aluminum': 'Rp 25.000',
                'cardboard': 'Rp 3.500',
              };
              const price = priceMap[material] || `Rp ${(Math.floor(Math.random() * 15) + 5) * 1000}`;
              recs.push({
                name: firstOutput.output_name,
                estimatedPrice: `${price} / kg`,
                trend,
                fromMaterial: material,
              });
            }
          }
        } catch (e) {
          // skip silently
        }
      }
      setRecommended(recs);

      // Pull pending and completed connections
      const factoryIds = factoriesData.map(f => f.factory_id);
      if (factoryIds.length > 0) {
        const { data: pending } = await supabase
          .from('Connections')
          .select('id, factory_id, status, created_at, Factory ( factory_name, city )')
          .eq('status', 'pending')
          .in('factory_id', factoryIds);
        setPendingConnections((pending || []) as any);

        const { data: completed } = await supabase
          .from('Connections')
          .select('id, factory_id, status, created_at, Factory ( factory_name, city )')
          .eq('status', 'completed')
          .in('factory_id', factoryIds);
        setPastConnections((completed || []) as any);
      }

      setLoading(false);
    };
    load();
  }, [router]);

  const toggleFactory = (id: string) => {
    setExpandedFacId(expandedFacId === id ? null : id);
  };

  const totalTons = factories.reduce((t, f) => t + f.WasteListings.reduce((s, w) => s + (w.quantity_tons_month || 0), 0), 0);
  const allWaste = factories.flatMap(f => f.WasteListings.map(w => ({ ...w, factory_name: f.factory_name })));
  const co2Est = Math.round(totalTons * 12 * 0.7);
  const savingsEst = (totalTons * 12 * 2000 / 1_000_000).toFixed(1);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center font-[family-name:var(--font-creato-display)]">
        <p className="text-sm font-bold text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-[family-name:var(--font-creato-display)]">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Welcome, {company?.name || 'Factory'}</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Factory Sourcing & Waste Management</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={() => router.push('/en/sign-up/factory/add-branch')} className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-black text-white shadow-sm transition-all hover:bg-slate-700 active:scale-[0.98]">
            + Add Factory
          </button>
          <button onClick={() => router.push('/en/dashboard/matching')} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50">
            Sell Waste
          </button>
          <button onClick={() => router.push('/en/dashboard/marketplace')} className="flex items-center gap-2 rounded-xl bg-[#608334] px-5 py-2.5 text-sm font-black text-white shadow-md transition-all hover:bg-[#4a6628] active:scale-[0.98]">
            <span>🛒</span> Buy Materials
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total waste listed</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-800">{totalTons.toLocaleString()}</span>
            <span className="text-sm font-bold text-slate-500">tons</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">CO2 saved (est.)</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#608334]">{co2Est.toLocaleString()}</span>
            <span className="text-sm font-bold text-slate-500">tons CO2 / year</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Potential savings</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#608334]">Rp {savingsEst}M</span>
            <span className="text-sm font-bold text-slate-500">vs. conventional</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* COLUMN 1 */}
        <div className="flex flex-col gap-8">

          {/* YOUR FACTORIES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-800">Your factories</h2>
              <Link href="/en/sign-up/factory/add-branch" className="text-xs font-bold text-[#608334] hover:underline">Manage ↗</Link>
            </div>

            <div className="flex flex-col gap-3">
              {factories.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                  <p className="text-sm font-bold text-slate-400">No factories yet</p>
                  <button onClick={() => router.push('/en/sign-up/factory/add-branch')} className="mt-3 rounded-lg bg-[#608334] px-4 py-2 text-xs font-black text-white">+ Add your first factory</button>
                </div>
              ) : factories.map((fac) => {
                const isExpanded = expandedFacId === fac.factory_id;
                const isEmpty = fac.WasteListings.length === 0;

                return (
                  <div key={fac.factory_id} className={`flex flex-col rounded-xl border transition-all overflow-hidden ${isExpanded ? 'border-[#CBDDB5] shadow-sm' : 'border-slate-100 hover:border-[#CBDDB5]'}`}>
                    <button onClick={() => toggleFactory(fac.factory_id)} className={`flex w-full items-center justify-between p-4 text-left transition-colors ${isExpanded ? 'bg-[#F7FEEF]' : 'bg-slate-50 hover:bg-[#F7FEEF]'}`}>
                      <div>
                        <span className="block text-sm font-black text-slate-800">{fac.factory_name}</span>
                        <span className="text-xs font-bold text-slate-500">{fac.city}, {fac.province}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase border ${isEmpty ? 'border-slate-200 bg-white text-slate-400' : 'border-[#CBDDB5] bg-white text-[#608334]'}`}>
                          {fac.WasteListings.length} WASTE TYPES
                        </span>
                        <svg className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-[#608334]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="flex flex-col gap-3 border-t border-[#CBDDB5]/40 bg-white p-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Waste produced by this factory:</span>

                        {isEmpty ? (
                          <div className="rounded-lg border border-dashed border-slate-200 py-4 text-center text-xs font-medium text-slate-400">No waste listed yet.</div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {fac.WasteListings.map(w => (
                              <div key={w.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                                <div>
                                  <span className="block text-xs font-black text-slate-700">{w.material}</span>
                                  <span className="text-[10px] font-bold text-slate-500">{w.quantity_tons_month} tons</span>
                                </div>
                                <button onClick={() => router.push(`/en/dashboard/matching?wasteId=${w.id}`)} className="text-[10px] font-black text-[#608334] hover:underline">Find matches →</button>
                              </div>
                            ))}
                          </div>
                        )}

                        <button onClick={() => router.push(`/en/sign-up/factory/add-waste?factoryId=${fac.factory_id}`)} className="mt-1 w-full rounded-lg bg-[#CBDDB5]/30 py-2.5 text-[11px] font-black uppercase tracking-widest text-[#608334] transition-colors hover:bg-[#608334] hover:text-white">
                          + Add waste here
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RECOMMENDED MATERIALS — now from real circular flow data */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-black tracking-tight text-slate-800">Recommended Recycled Materials</h2>
            <div className="flex flex-col gap-4">
              {recommended.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-xs font-bold text-slate-400">
                  Add waste listings to see recommended recycled materials
                </div>
              ) : recommended.map((rec, i) => (
                <div key={i} className={`flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-[#CBDDB5] hover:bg-[#F7FEEF]`}>
                  <div>
                    <span className={`block text-sm font-black ${i === 0 ? 'text-[#608334]' : 'text-slate-700'}`}>{rec.name}</span>
                    <span className="text-[11px] font-bold text-slate-500">{rec.estimatedPrice} · {rec.trend}</span>
                  </div>
                  <button onClick={() => router.push('/en/dashboard/marketplace')} className="rounded-lg bg-[#CBDDB5] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#608334] hover:bg-[#608334] hover:text-white transition-colors">
                    Find Suppliers 🔍
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col gap-6">

          {/* ALL ACTIVE WASTE LISTINGS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-800">All active waste listings</h2>
              <Link href="/en/sign-up/factory/add-waste" className="text-xs font-bold text-[#608334] hover:underline">+ Add waste ↗</Link>
            </div>
            <div className="flex flex-col gap-3">
              {allWaste.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm font-bold text-slate-400">No waste listings yet</div>
              ) : allWaste.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div>
                    <span className="block text-sm font-black text-slate-800">{item.material}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.quantity_tons_month} tons · {item.factory_name}</span>
                  </div>
                  <button onClick={() => router.push(`/en/dashboard/matching?wasteId=${item.id}`)} className="rounded-lg bg-[#F7FEEF] border border-[#CBDDB5] px-3 py-1.5 text-[10px] font-black uppercase text-[#608334] hover:bg-[#608334] hover:text-white transition-all">
                    Find matches
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PENDING LISTINGS — now from real Connections table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-800">
              Pending listings
              {pendingConnections.length > 0 && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                </span>
              )}
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {pendingConnections.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-xs font-bold text-slate-400">
                  No pending connections
                </div>
              ) : pendingConnections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div>
                    <span className="block text-sm font-black text-slate-800">{conn.Factory?.factory_name || 'Factory'}</span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">{conn.Factory?.city || '—'}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-amber-500">Finding Partners...</span>
                </div>
              ))}
            </div>
          </div>

          {/* PAST WASTE LISTINGS — now from real Connections (completed) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm opacity-90">
            <h2 className="text-xl font-black text-slate-500">Past waste listings</h2>
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              {pastConnections.length === 0 ? (
                <div className="text-center text-xs font-bold text-slate-400 py-2">
                  No completed partnerships yet
                </div>
              ) : pastConnections.map((conn) => (
                <div key={conn.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-black text-slate-400 line-through">{conn.Factory?.factory_name}</span>
                      <span className="text-[10px] font-bold uppercase text-slate-400">{conn.Factory?.city || '—'}</span>
                    </div>
                    <span className="rounded-md bg-white border border-slate-200 px-2 py-1 text-[10px] font-black text-slate-400">Completed</span>
                  </div>
                  <div className="mt-2 rounded-lg border border-[#CBDDB5] bg-[#F7FEEF] p-3 text-xs font-bold text-slate-600">
                    🤝 Partnership completed<br/>
                    <span className="text-[10px] font-medium text-slate-500">{new Date(conn.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
