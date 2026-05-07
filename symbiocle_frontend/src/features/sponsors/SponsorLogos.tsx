"use client";

/* eslint-disable react-dom/no-unsafe-target-blank */
import Image from 'next/image';
import { motion } from 'framer-motion';

import { LogoCloud } from '@/features/landing/LogoCloud';

export const SponsorLogos = () => {
  // Class Tailwind bawaan biar efek hover-nya seragam & nggak perlu ngetik ulang
  const logoHoverEffect = "flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100 cursor-pointer";

  return (
    //motion.div pembungkus utama
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <LogoCloud text="">
        
        {/* Logo 1 (Muncul pertama, delay 0) */}
        <motion.a 
          className={logoHoverEffect}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/1.png"
            alt="Company 1 logo dark"
            className="dark:hidden"
            width="100"
            height="24"
          />
          <Image
            src="/assets/images/light1.png"
            alt="Company 1 logo light"
            className="hidden dark:block"
            width="100"
            height="24"
          />
        </motion.a>

        {/* Logo 2 (delay 0.15 detik) */}
        <motion.a 
          className={logoHoverEffect}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/2.png"
            alt="Company 2 logo dark"
            className="dark:hidden"
            width="100"
            height="10"
          />
          <Image
            src="/assets/images/light2.png"
            alt="Company 2 logo light"
            className="hidden dark:block"
            width="100"
            height="10"
          />
        </motion.a>

        {/* Logo 3 (delay 0.30 detik) */}
        <motion.a 
          className={logoHoverEffect}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.30 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/3.png"
            alt="Company 3 logo dark"
            className="dark:hidden"
            width="100"
            height="24"
          />
          <Image
            src="/assets/images/light3.png"
            alt="Company 3 logo light"
            className="hidden dark:block"
            width="100"
            height="24"
          />
        </motion.a>

        {/* Logo 4 (delay 0.45 detik) */}
        <motion.a 
          className={logoHoverEffect}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/4.png"
            alt="Company 4 logo dark"
            className="dark:hidden"
            width="100"
            height="24"
          />
          <Image
            src="/assets/images/light4.png"
            alt="Company 4 logo light"
            className="hidden dark:block"
            width="100"
            height="24"
          />
        </motion.a>

        {/* Logo 5 (delay 0.60 detik) */}
        <motion.a 
          className={logoHoverEffect}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.60 }}
          viewport={{ once: true }}
        >
          <Image
            src="/assets/images/5.png"
            alt="Company 5 logo dark"
            className="dark:hidden"
            width="100"
            height="24"
          />
          <Image
            src="/assets/images/light5.png"
            alt="Company 5 logo light"
            className="hidden dark:block"
            width="100"
            height="24"
          />
        </motion.a>

      </LogoCloud>
    </motion.div>
  );
};