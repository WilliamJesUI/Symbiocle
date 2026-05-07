"use client";

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Section } from '@/features/landing/Section';

export const Features = () => {
  return (
    // Background diubah jadi off-white nyatu, ditambah relative & overflow-hidden buat ornamen
    <div id="about-us" className="relative scroll-mt-32 py-16 md:py-24 bg-[#FBFDF9] overflow-hidden">
      
      {/* --- ORNAMEN GLOWING BOLA CAHAYA --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#CBDDB5] rounded-full blur-[120px] opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#A8CA7E] rounded-full blur-[100px] opacity-30 -z-10" />
      
      <Section>
        <div className="mb-16 text-center relative z-10">
          <div className="mb-3 text-sm font-bold uppercase tracking-wider text-[#608334]">
            Symbiocle makes it real
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl font-[family-name:var(--font-tt-interphase)]">
            Fight pollution and thrive economically, <br className="hidden md:block" /> one waste at a time.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Our platform operationalizes the circular economy at scale. We facilitate the technical and chemical matching of industrial outputs to manufacturing inputs, measurable through a significant reduction in landfill diversion rates and a quantifiable increase in resource productivity across the network.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-2xl border border-gray-100/50 bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#CBDDB5]"
          >
            <div className="mb-6 flex h-14 w-fit min-w-[3.5rem] items-center justify-center rounded-xl bg-gradient-to-br from-[#A8CA7E] to-[#608334] px-4 text-xl font-bold text-white shadow-md">
              <CountUp end={10000} duration={2.5} separator="," suffix="+" enableScrollSpy scrollSpyOnce />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-tt-interphase)]">
              Kg Waste Recycled
            </h3>
            <div className="my-4 h-[3px] w-12 rounded-full bg-[#CBDDB5]" />
            <p className="leading-relaxed text-slate-600">
              Diverting plastic and organic waste from landfills through our smart tracking and collection system.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-2xl border border-gray-100/50 bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#CBDDB5]"
          >
            <div className="mb-6 flex h-14 w-fit min-w-[3.5rem] items-center justify-center rounded-xl bg-gradient-to-br from-[#A8CA7E] to-[#608334] px-4 text-xl font-bold text-white shadow-md">
              <CountUp prefix="Rp" end={50000000} duration={3} separator="." enableScrollSpy scrollSpyOnce />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-tt-interphase)]">
              Economic Value
            </h3>
            <div className="my-4 h-[3px] w-12 rounded-full bg-[#CBDDB5]" />
            <p className="leading-relaxed text-slate-600">
              Converting recycled materials into direct profit, creating new sustainable revenue streams.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-2xl border border-gray-100/50 bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#CBDDB5]"
          >
            <div className="mb-6 flex h-14 w-fit min-w-[3.5rem] items-center justify-center rounded-xl bg-gradient-to-br from-[#A8CA7E] to-[#608334] px-4 text-xl font-bold text-white shadow-md">
              <CountUp end={25} duration={2} suffix="+" enableScrollSpy scrollSpyOnce />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-tt-interphase)]">
              Tons CO2 Saved
            </h3>
            <div className="my-4 h-[3px] w-12 rounded-full bg-[#CBDDB5]" />
            <p className="leading-relaxed text-slate-600">
              Reducing carbon footprints by optimizing waste collection routes and processing materials locally.
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};