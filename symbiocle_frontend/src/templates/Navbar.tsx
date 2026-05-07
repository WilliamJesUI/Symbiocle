"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  // Bikin state buat nyimpen status scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kalau lewat dari 50px, nyalain mode 'terang'
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // BUNGKUS DARI INDEXPAGE PINDAH KE SINI: Kita atur warnanya dinamis!
    <div className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 rounded-full transition-all duration-500 ${
      isScrolled 
        ? 'top-4 bg-white/90 backdrop-blur-md border border-slate-200 shadow-md' // Pas di-scroll: Putih terang, agak naik ke atas (top-4)
        : 'top-6 bg-[#121826]/20 backdrop-blur-lg border border-white/20 shadow-2xl' // Pas di atas: Transparan gelap, posisi top-6
    }`}>
      
      <nav className="flex w-full items-center justify-between px-8 py-3">
        
        {/* BAGIAN KIRI: Logo */}
        <div className="flex shrink-0 items-center">
          <span className={`text-3xl font-black tracking-tight transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Symbiocle<span className="text-[#608334]">.</span>
          </span>
        </div>

        {/* BAGIAN TENGAH: Menu Teks */}
        {/* Warnanya item pas putih, dan putih pas gelap */}
        <ul className={`hidden md:flex items-center gap-x-8 text-sm font-medium transition-all duration-500 ${
          isScrolled ? 'text-slate-600' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]'
        }`}>
          <li><Link href="#about-us" className="hover:text-[#608334] transition-colors">About Us</Link></li>
          <li><Link href="#vision-and-mission" className="hover:text-[#608334] transition-colors">Vision & Mission</Link></li>
          <li><Link href="#partners" className="hover:text-[#608334] transition-colors">Our Partners</Link></li>
          <li><Link href="#how-it-works" className="hover:text-[#608334] transition-colors">How it works</Link></li>
        </ul>

        {/* BAGIAN KANAN: Tombol Login/Register */}
        <div className="flex items-center gap-x-4 shrink-0">
          <Link 
            href="/sign-in" 
            className={`text-sm font-medium transition-all duration-500 ${
              isScrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white hover:text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]'
            }`}
          >
            Sign In
          </Link>
          
          {/* Tombol Sign Up juga berubah warna biar match */}
          <Link 
            href="/choose-role" 
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-500 ${
              isScrolled ? 'bg-[#608334] text-white hover:bg-[#4a6628]' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Sign Up
          </Link>
        </div>

      </nav>
    </div>
  );
};