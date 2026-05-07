"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/features/landing/Section';

export const FAQ = () => {
  const t = useTranslations('FAQ');

  return (
    <div id="how-it-works" className="scroll-mt-32 py-16 md:py-24 bg-[#FBFDF9]">
      <Section>
        {/* Layout dibagi 2 kolom di layar desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* KOLOM KIRI: Teks & Accordion */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl font-[family-name:var(--font-tt-interphase)]">
              How <span className="text-[#608334]">Symbiocle</span> works
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              A seamless process designed to turn industrial waste into valuable resources through smart technology.
            </p>
            
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1" className="border-b-[#CBDDB5]">
                <AccordionTrigger className="hover:text-[#608334] text-lg">{t('step1_title')}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{t('step1_desc')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-[#CBDDB5]">
                <AccordionTrigger className="hover:text-[#608334] text-lg">{t('step2_title')}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{t('step2_desc')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-[#CBDDB5]">
                <AccordionTrigger className="hover:text-[#608334] text-lg">{t('step3_title')}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{t('step3_desc')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b-[#CBDDB5]">
                <AccordionTrigger className="hover:text-[#608334] text-lg">{t('step4_title')}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{t('step4_desc')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* KOLOM KANAN: Animasi Floating Card UI */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hidden lg:flex relative h-[500px] w-full rounded-3xl bg-gradient-to-br from-[#F7FEEF] to-[#E3F2D0] border border-[#CBDDB5] shadow-inner items-center justify-center overflow-hidden"
          >
            {/* Bola Dekorasi */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#A8CA7E] rounded-full blur-2xl opacity-50" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#608334] rounded-full blur-3xl opacity-30" />

            {/* Kotak AI Matchmaking (Melayang-layang) */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 w-3/4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#A8CA7E] to-[#608334] flex items-center justify-center mb-6 shadow-lg overflow-hidden">
                <img 
                  src="/assets/images/S.png" 
                  alt="AI Icon" 
                  className="w-8 h-8 object-contain" 
                />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2 font-[family-name:var(--font-tt-interphase)]">AI Matchmaking</h3>
              <div className="w-full space-y-3 mt-4">
                <div className="h-3 bg-slate-100 rounded-full w-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-[#608334]" />
                </div>
                <p className="text-xs text-slate-500 text-center font-medium uppercase tracking-widest">Finding best match...</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Section>
    </div>
  );
};