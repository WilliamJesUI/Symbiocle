"use client";

import { Suspense } from 'react'; 
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/libs/Supabase';

const AI_API = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

// Fallback labels (UI display) - matches the AI backend categories
const CATEGORY_LABELS: Record<string, string> = {
  plastic: 'Plastic',
  textile: 'Textile',
  metal: 'Metal',
  organic: 'Organic',
  hazardous: 'Hazardous / B3',
  paper: 'Paper',
  glass: 'Glass',
  electronic: 'Electronic',
  rubber: 'Rubber',
  industrial_byproduct: 'Industrial Byproduct',
  mixed: 'Mixed Waste',
};

type WasteRow = { id: string; material: string; quantity_tons_month: number; is_b3: boolean; waste_category: string };
type FactoryRow = { factory_id: string; factory_name: string };

function AddWasteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedFactoryId = searchParams.get('factoryId');

  const [factories, setFactories] = useState<FactoryRow[]>([]);
  const [factoryId, setFactoryId] = useState<string>(preselectedFactoryId || '');
  const [currentFactory, setCurrentFactory] = useState<FactoryRow | null>(null);

  const [wasteListings, setWasteListings] = useState<WasteRow[]>([]);

  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [quantity, setQuantity] = useState('');
  const [isB3, setIsB3] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user's factories
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/en/sign-in'); return; }
      const { data } = await supabase
        .from('Factory')
        .select('factory_id, factory_name')
        .eq('owner_id', user.id);
      const list = (data || []) as FactoryRow[];
      setFactories(list);
      // If no preselect, default to first factory
      if (!factoryId && list[0]) setFactoryId(list[0].factory_id);
    };
    load();
  }, [router]);

  // Load categories from AI backend
  useEffect(() => {
    fetch(`${AI_API}/categories`)
      .then(r => r.json())
      .then(d => {
        const list = d.categories || [];
        setCategories(list);
        if (list[0]) setCategory(list[0]);
      });
  }, []);

  // Load materials when category changes
  useEffect(() => {
    if (!category) return;
    setSelectedMaterials([]);
    setIsB3(category === 'hazardous');
    fetch(`${AI_API}/materials/${encodeURIComponent(category)}`)
      .then(r => r.json())
      .then(d => setMaterials(d.materials || []));
  }, [category]);

  // Load waste listings + factory info when factory changes
  useEffect(() => {
    if (!factoryId) return;
    const load = async () => {
      const { data: facData } = await supabase
        .from('Factory')
        .select('factory_id, factory_name')
        .eq('factory_id', factoryId)
        .single();
      setCurrentFactory(facData as FactoryRow);

      const { data: wasteData } = await supabase
        .from('WasteListings')
        .select('id, material, quantity_tons_month, is_b3, waste_category')
        .eq('factory_id', factoryId);
      setWasteListings((wasteData || []) as WasteRow[]);
    };
    load();
  }, [factoryId]);

  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleAddWaste = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || !factoryId) return;
    setError(null);
    setSubmitting(true);

    try {
      // Insert one row per selected material (or one row with first material if none selected)
      const matsToInsert = selectedMaterials.length > 0 ? selectedMaterials : (materials[0] ? [materials[0]] : []);
      if (matsToInsert.length === 0) throw new Error('Please select at least one material');

      const inserts = matsToInsert.map(mat => ({
        factory_id: factoryId,
        waste_category: category,
        material: mat,
        quantity_tons_month: Number(quantity),
        is_b3: isB3,
      }));

      const { data, error: insertError } = await supabase
        .from('WasteListings')
        .insert(inserts)
        .select();

      if (insertError) throw insertError;

      setWasteListings([...wasteListings, ...((data || []) as WasteRow[])]);
      setSelectedMaterials([]);
      setQuantity('');
      setIsB3(category === 'hazardous');
    } catch (err: any) {
      setError(err.message || 'Failed to add waste listing');
    } finally {
      setSubmitting(false);
    }
  };

  const categoryLabel = CATEGORY_LABELS[category] || category;

  return (
    <div className="min-h-screen bg-[#FBFDF9] px-4 py-10 font-[family-name:var(--font-creato-display)] md:py-16">
      <div className="mx-auto w-full max-w-3xl">
        
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
        >
          <span className="mr-2 text-lg leading-none">←</span> Back
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-800">
              Add Waste Listings
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Specify the waste generated by this factory to start matching with recyclers.
            </p>
            
            {/* Target factory card with selector */}
            <div className="mt-6 rounded-xl border border-[#CBDDB5] bg-[#F7FEEF] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#608334] text-lg font-black text-white">
                  B
                </div>
                <div className="flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#608334]">Target Factory</span>
                  {factories.length > 1 ? (
                    <select
                      value={factoryId}
                      onChange={(e) => setFactoryId(e.target.value)}
                      className="mt-1 block w-full appearance-none rounded-md border border-[#CBDDB5] bg-white px-2 py-1 text-sm font-black text-slate-800 outline-none"
                    >
                      {factories.map(f => (
                        <option key={f.factory_id} value={f.factory_id}>{f.factory_name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="block text-sm font-black text-slate-800">{currentFactory?.factory_name || '—'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleAddWaste} className="mb-12 flex flex-col gap-6 rounded-xl border border-slate-100 bg-slate-50/50 p-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:ring-2 focus:ring-[#608334]/20"
              >
                {categories.map((key) => (
                  <option key={key} value={key}>{CATEGORY_LABELS[key] || key}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Specific Material</label>
              <div className="flex flex-wrap gap-2">
              {materials.map((mat) => { 
                const isSelected = selectedMaterials.includes(mat);
                  return (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => toggleMaterial(mat)}
                      className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                        isSelected 
                        ? 'border-[#608334] bg-[#608334] text-white shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-500 hover:border-[#608334] hover:text-[#608334]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{mat}
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] font-bold text-slate-400">Select specific types of {categoryLabel.toLowerCase()} waste</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Quantity</label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  required
                  min="0" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0" 
                  className="w-32 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:ring-2 focus:ring-[#608334]/20"
                />
                <span className="text-sm font-black text-slate-400">Tons</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input 
                type="checkbox" 
                id="is-b3"
                checked={isB3}
                onChange={(e) => setIsB3(e.target.checked)}
                className="h-5 w-5 cursor-pointer rounded border-slate-300 bg-white accent-[#608334] transition-all"
              />
              <label htmlFor="is-b3" className="cursor-pointer text-sm font-bold text-slate-600">
                Classified as B3 (Hazardous)
              </label>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-xl bg-slate-800 py-4 text-sm font-black text-white shadow-sm transition-all hover:bg-slate-700 active:scale-[0.98] disabled:opacity-50"
            >
              {submitting ? 'Adding...' : '+ Add to List'}
            </button>
          </form>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Current Waste at this Factory</h3>
            
            <div className="flex flex-col gap-3">
              {wasteListings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm font-medium text-slate-400">
                  No waste added yet.
                </div>
              ) : (
                wasteListings.map((waste) => (
                  <div 
                    key={waste.id} 
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-[#CBDDB5]"
                  >
                    <div>
                      <span className="block text-sm font-black text-slate-800">{waste.material} ({CATEGORY_LABELS[waste.waste_category] || waste.waste_category})</span>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">{waste.quantity_tons_month} Tons</span>
                        {waste.is_b3 && (
                          <span className="rounded border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-black uppercase text-red-600">B3</span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => router.push('/en/dashboard/matching')}
                      className="flex items-center justify-center rounded-lg border border-[#CBDDB5] bg-[#F7FEEF] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#608334] transition-colors hover:bg-[#608334] hover:text-white"
                    >
                      Find Match
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-8">
            <button 
              onClick={() => router.push('/en/dashboard')}
              className="w-full rounded-xl bg-[#608334] py-4 text-sm font-black text-white shadow-sm transition-all hover:bg-[#4d6929] active:scale-[0.98]"
            >
              Finish & Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AddWasteStep() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FBFDF9]"><p className="text-sm font-bold text-slate-500">Loading...</p></div>}>
      <AddWasteContent />
    </Suspense>
  );
}

