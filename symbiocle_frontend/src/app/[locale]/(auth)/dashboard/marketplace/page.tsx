"use client";

import { useRouter } from 'next/navigation';

export default function MarketplacePage() {
  const router = useRouter();

  // Mock data F2F: Pabrik lain yang ngejual material
  const availableMaterials = [
    {
      id: 1,
      factoryName: 'PT Segar Sentosa',
      location: 'Cimahi, Jawa Barat',
      supply: '50 tons available',
      price: 'Rp 4.500 / kg',
      material: 'Premium Cotton Scrap',
      status: 'Best Match ✨',
      statusColor: 'text-[#608334] bg-[#F7FEEF] border-[#CBDDB5]',
      desc: 'High-quality cotton scrap from recent apparel production. Perfect for upcycling into heavy-duty textiles. Clean and sorted.'
    },
    {
      id: 2,
      factoryName: 'EcoWeave Industries',
      location: 'Tangerang, Banten',
      supply: '120 tons available',
      price: 'Rp 6.200 / kg',
      material: 'Polyester Thread Waste',
      status: 'High Demand 🔥',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
      desc: 'Clean polyester thread waste suitable for melting and respinning. Packaged in 50kg bales for easy transport.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFDF9] p-4 md:p-8 font-[family-name:var(--font-creato-display)]">
      <div className="mx-auto max-w-3xl">
        
        {/* Tombol Back ke Dashboard Factory */}
        <button 
          onClick={() => router.push('/en/dashboard')} 
          className="mb-6 flex items-center text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
        >
          <span className="mr-2 text-lg leading-none">←</span> Back to Dashboard
        </button>

        <h1 className="mb-2 text-2xl font-black tracking-tight text-slate-800">Marketplace Materials</h1>
        <p className="mb-8 text-sm font-medium text-slate-500">Browse and source raw materials directly from other factories (F2F).</p>

        <div className="flex flex-col gap-6">
          {availableMaterials.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-black text-slate-800">{item.material}</h3>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] font-bold text-slate-500">
                    <span>📍 {item.location}</span>
                    <span className="text-slate-700">🏭 {item.factoryName}</span>
                    <span className="text-slate-500">📦 {item.supply}</span>
                    <span className="rounded-md border border-[#CBDDB5] bg-[#F7FEEF] px-2 text-[#608334] font-black">{item.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs font-medium leading-relaxed text-slate-600">
                {item.desc}
              </div>

              {/* Tombol lari ke F2F Chat */}
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => router.push('/en/dashboard/chat-f2f')}
                  className="flex-1 rounded-xl bg-[#608334] py-3 text-sm font-black text-white shadow-sm transition-all hover:bg-[#4a6628] active:scale-[0.98]"
                >
                  Negotiate Material 🛒
                </button>
                <button className="hidden sm:block rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50">
                  View Factory Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}