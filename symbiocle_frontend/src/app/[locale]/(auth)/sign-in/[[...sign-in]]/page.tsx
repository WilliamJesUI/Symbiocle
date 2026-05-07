"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/libs/Supabase';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'factory' | 'recycler'>('factory');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      if (role === 'factory') {
        router.push('/en/dashboard');
      } else {
        router.push('/en/dashboard/recycler');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFDF9] p-4 font-[family-name:var(--font-creato-display)] text-slate-800">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
        
        <div className="mb-8 text-center">
          <span className="text-3xl font-black tracking-tight text-slate-900">
            Symbiocle<span className="text-[#608334]">.</span>
          </span>
          <p className="mt-2 text-sm font-bold text-slate-500">Welcome back! Please sign in to your account.</p>
        </div>

        {/* Role Selector Tabs (The Magic Trick) */}
        <div className="mb-8 flex rounded-xl bg-slate-50 p-1">
          <button 
            type="button"
            onClick={() => setRole('factory')}
            className={`flex-1 rounded-lg py-2.5 text-xs font-black uppercase tracking-wider transition-all ${role === 'factory' ? 'bg-white text-[#608334] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Factory
          </button>
          <button 
            type="button"
            onClick={() => setRole('recycler')}
            className={`flex-1 rounded-lg py-2.5 text-xs font-black uppercase tracking-wider transition-all ${role === 'recycler' ? 'bg-white text-[#608334] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Recycler
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-500">Corporate Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'factory' ? "ops@majutekstil.co.id" : "sourcing@plasticycle.com"}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500">
              Password
              <span className="cursor-pointer text-[10px] text-[#608334] hover:underline">Forgot?</span>
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-[#608334] py-3.5 text-sm font-black text-white shadow-sm transition-all hover:bg-[#4d6929] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In ↗'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-bold text-slate-500">
          Don't have an account?{' '}
          <Link href="/en/sign-up/factory" className="text-[#608334] hover:underline">
            Register your company
          </Link>
        </p>
      </div>
    </div>
  );
}