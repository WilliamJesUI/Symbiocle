"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Deteksi: "Apakah user lagi di area Recycler?"
  const isRecycler = pathname.includes('/recycler');
  
  // Tentukan link berdasarkan role
  const dashboardLink = isRecycler ? '/en/dashboard/recycler' : '/en/dashboard';
    
  return (
    <div className="min-h-screen bg-[#FBFDF9] font-[family-name:var(--font-creato-display)] text-slate-800">
      
      {/* Custom Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
          
          {/* UBAH: gap-10 udah diganti jadi gap-6 biar menu deketan sama logo */}
          <div className="flex items-center gap-6">
            
            {/* Logo */}
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Symbiocle<span className="text-[#608334]">.</span>
            </span>
            
            {/* Nav Links Utama */}
            <div className="hidden items-center gap-8 md:flex text-sm font-bold">
              <Link 
                href={dashboardLink} 
                className={`transition-colors ${
                  pathname.endsWith('/dashboard') || pathname.endsWith('/recycler') || pathname === dashboardLink 
                    ? 'text-slate-900 font-black' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Home
              </Link>
              
              {/* Menu 'Matches' & 'Marketplace' CUMA buat Factory */}
              {!isRecycler && (
                <>
                  <Link 
                    href={'/en/dashboard/matching'} 
                    className={`transition-colors ${
                      pathname.includes('/matching') ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Matches
                  </Link>
                  <Link 
                    href={'/en/dashboard/marketplace'} 
                    className={`transition-colors ${
                      pathname.includes('/marketplace') ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Marketplace
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* UBAH: Tombol "+ Add Factory" DIHAPUS DARI SINI BIAR GA DOBEL SAMA YANG DI HEADER BAWAHNYA */}

            {/* Profile Icon */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CBDDB5] bg-[#F7FEEF] text-sm font-black text-[#608334] shadow-sm transition-all hover:bg-[#CBDDB5] hover:text-slate-900">
              {isRecycler ? 'RC' : 'PT'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="mx-auto max-w-screen-xl px-4 pb-16 pt-8 md:px-6">
        {props.children}
      </main>
    </div>
  );
}