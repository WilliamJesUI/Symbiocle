"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export const Pricing = () => {
  return (
    <div id="vision-and-mission" className="scroll-mt-32 w-full py-12 md:py-16 bg-[#FBFDF9]">
      <div className="flex w-full flex-col">

        <div className="flex w-full flex-col md:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden bg-slate-300 md:w-1/2"
          >
            <Image
              src="/assets/images/waste2.jpg"
              alt="Symbiocle Vision"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex w-full flex-col justify-center bg-transparent p-10 md:w-1/2 md:p-16 lg:p-24"
          >
             <div className="mb-2 text-sm font-bold uppercase tracking-wider text-[#A8CA7E]">
              The Future
            </div>
            <h3 className="mb-6 text-3xl font-extrabold text-[#608334] lg:text-4xl font-[family-name:var(--font-tt-interphase)]">
              Symbiocle's Vision
            </h3>
            <p className="text-lg leading-relaxed text-slate-600">
              Transforming the Indonesian industrial sector from a linear economy into a sustainable circular ecosystem by redefining factory waste as high-value secondary raw materials.
            </p>
          </motion.div>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden bg-slate-200 md:w-1/2"
          >
            <Image
              src="/assets/images/waste1.jpg"
              alt="Symbiocle Mission"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex w-full flex-col justify-center bg-[#CBDDB5] p-10 md:w-1/2 md:p-16 lg:p-24"
          >
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-[#608334]">
              Our Purpose
            </div>
            <h3 className="mb-6 text-3xl font-extrabold text-slate-900 lg:text-4xl font-[family-name:var(--font-tt-interphase)]">
              Symbiocle's Mission
            </h3>
            
            <ul className="space-y-5 text-slate-800">
              <li className="flex flex-col">
                <strong className="text-lg">Bridge the Gap</strong>
                <span className="mt-1 leading-relaxed opacity-90">
                  Utilizing an AI-integrated B2B matchmaking web platform to automatically connect waste-producing factories with compatible recycling companies.
                </span>
              </li>
              <li className="flex flex-col">
                <strong className="text-lg">Foster Circular Economy</strong>
                <span className="mt-1 leading-relaxed opacity-90">
                  Significantly increase the 22.5 percent reuse rate of the 74 million tons of annual industrial waste to help prevent massive economic losses.
                </span>
              </li>
              <li className="flex flex-col">
                <strong className="text-lg">Optimize Sustainable Logistics</strong>
                <span className="mt-1 leading-relaxed opacity-90">
                  Leverage geospatial data to prioritize closer facilities, optimizing logistics and actively minimizing the carbon footprint of each transaction.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );
};