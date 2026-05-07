"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ChooseRole() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFDF9] px-4 py-12">
      
      {/* Container Kotak Kartu */}
      <div className="flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-10">
        
        {/* KARTU 1: CONTRIBUTOR */}
        {/* Bungkus luar MURNI buat animasi masuk (Framer Motion) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Bungkus dalam MURNI buat efek hover & desain (Tailwind CSS) */}
          <div className="group relative flex h-[480px] w-full max-w-[360px] flex-col overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
            <Image
              src="/assets/images/green1.jpg"
              alt="Contributor Background"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/95" />
            
            <div className="relative z-10 flex h-full flex-col p-8">
              <div className="w-fit rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-semibold italic tracking-wide text-white backdrop-blur-md">
                Create contributor's account
              </div>
              
              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white drop-shadow-lg font-[family-name:var(--font-tt-interphase)]">
                Contribute Your Company's Waste for Change
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-white/90 drop-shadow-md">
                Register here if your facility generates industrial waste and you are looking for a sustainable matching solution.
              </p>

              <div className="mt-auto flex justify-center pb-2">
                <Link 
                  href="/sign-up/factory"
                  className="w-full max-w-[180px] rounded-full bg-[#CBDDB5] py-3.5 text-center text-lg font-bold text-slate-900 shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KARTU 2: RECYCLER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <div className="group relative flex h-[480px] w-full max-w-[360px] flex-col overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
            <Image
              src="/assets/images/green2.jpg"
              alt="Recycler Background"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#A8CA7E]/40 via-black/30 to-black/95" />
            
            <div className="relative z-10 flex h-full flex-col p-8">
              <div className="w-fit rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-semibold italic tracking-wide text-white backdrop-blur-md">
                Create recycler's account
              </div>
              
              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white drop-shadow-lg font-[family-name:var(--font-tt-interphase)]">
                Be our Recycling Partner
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-white/90 drop-shadow-md">
                Register here if you represent a recycling company seeking a reliable stream of specific industrial waste to process.
              </p>

              <div className="mt-auto flex justify-center pb-2">
                <Link 
                  href="/sign-up/recycler"
                  className="w-full max-w-[180px] rounded-full bg-[#CBDDB5] py-3.5 text-center text-lg font-bold text-slate-900 shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Teks Login di Bawah */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-slate-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-bold text-[#608334] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
      
    </div>
  );
}