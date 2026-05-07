import Link from 'next/link';

import { Section } from '@/features/landing/Section';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <Section className="pb-8 pt-0">
      <div className="flex flex-col items-center text-center">
        <Logo />
        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-4 text-lg font-medium text-slate-700">
          <li>
            <Link href="#about-us" className="hover:text-slate-900 transition">About Us</Link>
          </li>
          <li>
            <Link href="#vision-and-mission" className="hover:text-slate-900 transition">Vision & Mission</Link>
          </li>
          <li>
            <Link href="#how-it-works" className="hover:text-slate-900 transition">How it Works</Link>
          </li>
          <li>
            <Link href="/choose-role" className="font-bold text-[#608334] hover:text-[#4a6628] transition">
              Join as Partner
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Footer Bawah Super Clean Tanpa Embel-Embel */}
      <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Symbiocle. All rights reserved.
      </div>
    </Section>
  );
};