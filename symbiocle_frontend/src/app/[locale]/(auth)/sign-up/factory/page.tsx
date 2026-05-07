"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/libs/Supabase';

export default function FactorySignUp() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [npwp, setNpwp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create account');

      const { error: insertError } = await supabase.from('Company').insert({
        id: authData.user.id,
        name: companyName,
        npwp,
        account_type: 'factory',
      });
      if (insertError) throw insertError;

      router.push('/en/dashboard');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFDF9] px-4 py-12 font-[family-name:var(--font-creato-display)]">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">
            Factory Sign Up
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Join Symbiocle to match your industrial waste with trusted recyclers.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
          
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company name</label>
              <input 
                type="text" 
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="PT Maju Tekstil Indonesia" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">NPWP / NIB</label>
              <input 
                type="text" 
                required
                value={npwp}
                onChange={(e) => setNpwp(e.target.value)}
                placeholder="Masukkan 15-16 digit NPWP / NIB" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"
              />
              <span className="text-[10px] font-bold text-slate-400">Required for B2B verification</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@majutekstil.co.id" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"
              />
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#608334] py-4 text-sm font-black text-white shadow-sm transition-all hover:bg-[#4d6929] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create factory account'}
            </button>
          </div>
          
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{' '}
          <Link href="/en/sign-in" className="font-bold text-[#608334] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}