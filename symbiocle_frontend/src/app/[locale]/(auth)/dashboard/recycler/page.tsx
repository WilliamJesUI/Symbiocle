"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- DATA MOCKUP ---
const FACTORY_DATA = [
  { 
    id: 1, 
    name: 'Pabrik Bandung Utara', 
    loc: 'Bandung, Jawa Barat', 
    wastes: [
      { id: 101, name: 'cotton_scrap', amount: '500 tons', match: '3 matches' },
      { id: 102, name: 'fabric_waste', amount: '200 tons', match: '3 matches' }
    ] 
  },
  { 
    id: 2, 
    name: 'Pabrik Bekasi', 
    loc: 'Bekasi, Jawa Barat', 
    wastes: [
      { id: 103, name: 'PET plastic', amount: '500 tons', match: '3 matches' }
    ] 
  },
  { 
    id: 3, 
    name: 'Pabrik Surabaya', 
    loc: 'Surabaya, Jawa Timur', 
    wastes: [] // Kosong, belum ada limbah
  },
];

export default function DashboardIndexPage() {
  const router = useRouter();
  
  // State buat nyimpen ID pabrik mana yang lagi di-expand (diklik)
  const [expandedFacId, setExpandedFacId] = useState<number | null>(null);

  const toggleFactory = (id: number) => {
    // Kalau yang diklik udah kebuka, tutup. Kalau belum, buka yang ini.
    setExpandedFacId(expandedFacId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-8 font-[family-name:var(--font-creato-display)]">
      
      {/* Header Dashboard Factory */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Welcome, PT Maju Tekstil</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Factory Sourcing & Waste Management</p>
        </div>
        
        {/* Kumpulan Tombol Action */}
        <div className="flex flex-wrap gap-3">
          
          {/* 1. Add Factory - Sekarang jadi Solid Dark biar Signifikan! */}
          <button 
            onClick={() => router.push('/en/sign-up/factory/add-branch')}
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-black text-white shadow-sm transition-all hover:bg-slate-700 active:scale-[0.98]">
            + Add Factory
          </button>

          {/* 2. Sell Waste -> Tetep Outline (Secondary Action) */}
          <button 
            onClick={() => router.push('/en/dashboard/matching')}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Sell Waste
          </button>

          {/* 3. Buy Materials -> Tetep Hijau (Primary Action) */}
          <button 
            onClick={() => router.push('/en/dashboard/marketplace')} 
            className="flex items-center gap-2 rounded-xl bg-[#608334] px-5 py-2.5 text-sm font-black text-white shadow-md transition-all hover:bg-[#4a6628] active:scale-[0.98]"
          >
            <span>🛒</span> Buy Materials
          </button>

        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total waste listed</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-800">1,350</span>
            <span className="text-sm font-bold text-slate-500">tons</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">CO2 saved (est.)</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#608334]">840</span>
            <span className="text-sm font-bold text-slate-500">tons CO2 / year</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Potential savings</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#608334]">Rp 2.4M</span>
            <span className="text-sm font-bold text-slate-500">vs. conventional</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

      
        
        {/* ================= COLUMN 1 ================= */}
        <div className="flex flex-col gap-8">
          
          {/* ================= YOUR FACTORIES (ACCORDION) ================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-800">Your factories</h2>
              <Link href="/en/sign-up/factory/add-branch" className="text-xs font-bold text-[#608334] hover:underline">Manage ↗</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              {FACTORY_DATA.map((fac) => {
                const isExpanded = expandedFacId === fac.id;
                const isEmpty = fac.wastes.length === 0;

                return (
                  <div key={fac.id} className={`flex flex-col rounded-xl border transition-all overflow-hidden ${isExpanded ? 'border-[#CBDDB5] shadow-sm' : 'border-slate-100 hover:border-[#CBDDB5]'}`}>
                    
                    {/* Header Card (Bisa diklik) */}
                    <button 
                      onClick={() => toggleFactory(fac.id)}
                      className={`flex w-full items-center justify-between p-4 text-left transition-colors ${isExpanded ? 'bg-[#F7FEEF]' : 'bg-slate-50 hover:bg-[#F7FEEF]'}`}
                    >
                      <div>
                        <span className="block text-sm font-black text-slate-800">{fac.name}</span>
                        <span className="text-xs font-bold text-slate-500">{fac.loc}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase border ${isEmpty ? 'border-slate-200 bg-white text-slate-400' : 'border-[#CBDDB5] bg-white text-[#608334]'}`}>
                          {fac.wastes.length} WASTE TYPES
                        </span>
                        {/* Icon Panah */}
                        <svg className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-[#608334]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Area yang kebuka pas di-expand */}
                    {isExpanded && (
                      <div className="flex flex-col gap-3 border-t border-[#CBDDB5]/40 bg-white p-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Waste produced by this factory:</span>
                        
                        {isEmpty ? (
                          <div className="rounded-lg border border-dashed border-slate-200 py-4 text-center text-xs font-medium text-slate-400">
                            No waste listed yet.
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {fac.wastes.map(w => (
                              <div key={w.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                                <div>
                                  <span className="block text-xs font-black text-slate-700">{w.name}</span>
                                  <span className="text-[10px] font-bold text-slate-500">{w.amount}</span>
                                </div>
                                <span className="text-[10px] font-black text-[#608334]">{w.match}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tombol Spesifik per Pabrik */}
                        <button 
                          onClick={() => router.push('/en/sign-up/factory/add-waste')}
                          className="mt-1 w-full rounded-lg bg-[#CBDDB5]/30 py-2.5 text-[11px] font-black uppercase tracking-widest text-[#608334] transition-colors hover:bg-[#608334] hover:text-white"
                        >
                          + Add waste here
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Materials */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-black tracking-tight text-slate-800">Recommended Recycled Materials</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-[#CBDDB5] hover:bg-[#F7FEEF]">
                <div>
                  <span className="block text-sm font-black text-[#608334]">Recycled Cotton Yarn</span>
                  <span className="text-[11px] font-bold text-slate-500">Rp 18.500 / kg · Stabil</span>
                </div>
                <button 
                  onClick={() => router.push('/en/dashboard/marketplace')}
                  className="rounded-lg bg-[#CBDDB5] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#608334] hover:bg-[#608334] hover:text-white transition-colors"
                >
                  Find Suppliers 🔍
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-[#CBDDB5] hover:bg-[#F7FEEF]">
                <div>
                  <span className="block text-sm font-black text-slate-700">RPET Flakes (Clear)</span>
                  <span className="text-[11px] font-bold text-slate-500">Rp 12.000 / kg · Demand Naik</span>
                </div>
                <button 
                  onClick={() => router.push('/en/dashboard/marketplace')}
                  className="rounded-lg bg-[#CBDDB5] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#608334] hover:bg-[#608334] hover:text-white transition-colors"
                >
                  Find Suppliers 🔍
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2 (GLOBAL WASTE LISTINGS) ================= */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-800">All active waste listings</h2>
              <Link href="/en/sign-up/factory/add-waste" className="text-xs font-bold text-[#608334] hover:underline">+ Add waste ↗</Link>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { name: 'cotton_scrap', sub: '500 tons · Bandung Utara', match: '3 matches' },
                { name: 'fabric_waste', sub: '200 tons · Bandung Utara', match: '3 matches' },
                { name: 'PET plastic', sub: '500 tons · Bekasi', match: '3 matches' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div>
                    <span className="block text-sm font-black text-slate-800">{item.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.sub}</span>
                  </div>
                  <Link href="/en/dashboard/matching" className="rounded-lg bg-[#F7FEEF] border border-[#CBDDB5] px-3 py-1.5 text-[10px] font-black uppercase text-[#608334] hover:bg-[#608334] hover:text-white transition-all">
                    {item.match}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-800">
              Pending listings 
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              </span>
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <div>
                  <span className="block text-sm font-black text-slate-800">mixed_waste</span>
                  <span className="text-[10px] font-bold uppercase text-slate-500">150 tons · Surabaya</span>
                </div>
                <span className="text-[10px] font-black uppercase text-amber-500">Finding Partners...</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm opacity-90">
            <h2 className="text-xl font-black text-slate-500">Past waste listings</h2>
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-sm font-black text-slate-400 line-through">cardboard_boxes</span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">300 tons · Bekasi</span>
                </div>
                <span className="rounded-md bg-white border border-slate-200 px-2 py-1 text-[10px] font-black text-slate-400">Completed</span>
              </div>
              <div className="rounded-lg border border-[#CBDDB5] bg-[#F7FEEF] p-3 text-xs font-bold text-slate-600">
                🤝 Connected with <span className="text-[#608334]">EcoPack Solutions</span><br/>
                <span className="text-[10px] font-medium text-slate-500">Recycled into packaging material (May 2026)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
