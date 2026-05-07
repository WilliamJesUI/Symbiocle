"use client";

import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Section } from '@/features/landing/Section';

export const CTA = () => {
  return (
    <div className="bg-[#FBFDF9]"> {/* Tambah bungkus bg biar bawahnya nyatu */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          // 👇 UBAH DI SINI: my-24 diganti jadi mt-8 mb-24 biar atasnya nggak kopong
          className="relative mt-8 mb-24 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#A8CA7E] via-[#97B770] to-[#608334] px-6 py-16 text-center shadow-2xl md:px-12 md:py-20"
        >
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-6 text-3xl font-extrabold text-white md:text-5xl font-[family-name:var(--font-tt-interphase)]">
              Create impact with Symbiocle!
            </h2>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 leading-relaxed">
              Be part of the circular economy revolution. <br />
              Join our growing network of eco-conscious partners, optimize your waste management, and turn sustainability into tangible profitability today.
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/choose-role" 
                className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#608334] shadow-xl transition-colors hover:bg-[#F7FEEF]"
              >
                Get started
                <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};