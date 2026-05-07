"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Import data lokasi
import { LOCATIONS } from '@/data/locations';

type WasteCategory = { label: string; materials: string[] };

const INITIAL_WASTE_DATA: Record<string, WasteCategory> = {
  plastic: { label: 'Plastic', materials: ['PET', 'HDPE', 'PP'] },
  textile: { label: 'Textile', materials: ['Cotton', 'Polyester'] },
  metal: { label: 'Metal', materials: ['Copper', 'Aluminum', 'Steel'] },
  organic: { label: 'Organic', materials: ['Food Waste', 'Coffee Grounds'] },
  hazardous: { label: 'Hazardous / B3', materials: ['Medical', 'Chemical'] },
  mixed: { label: 'Mixed Waste', materials: [] }
};

export default function RecyclerSignUp() {
  const router = useRouter();

  // ==========================================
  // STATE LOKASI DINAMIS (Anti-Error TS)
  // ==========================================
  const provinces = Object.keys(LOCATIONS);
  
  // Kasih tau TS kalau ini pasti string, kalau kosong ya string kosong ''
  const [province, setProvince] = useState<string>(provinces[0] || '');

  const getCities = (prov: string) => {
    if (!prov) return []; // Guard clause pengaman
    const provData = LOCATIONS[prov as keyof typeof LOCATIONS];
    return provData ? Object.keys(provData) : [];
  };

  const cities = getCities(province);
  const [city, setCity] = useState<string>(cities[0] || '');

  const getPostcodes = (prov: string, cty: string) => {
    if (!prov || !cty) return []; // Guard clause pengaman
    const provData = LOCATIONS[prov as keyof typeof LOCATIONS];
    if (!provData) return [];
    const cityData = provData[cty as keyof typeof provData];
    return cityData ? cityData.postcodes : [];
  };

  const postcodes = getPostcodes(province, city);
  const [postcode, setPostcode] = useState<string>(postcodes[0] || '');

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProv = e.target.value;
    setProvince(newProv);
    const newCities = getCities(newProv);
    setCity(newCities[0] || '');
    const newPostcodes = getPostcodes(newProv, newCities[0] || '');
    setPostcode(newPostcodes[0] || '');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setCity(newCity);
    const newPostcodes = getPostcodes(province, newCity);
    setPostcode(newPostcodes[0] || '');
  };
  // ==========================================

  // STATE WASTE
  const [wasteData, setWasteData] = useState<Record<string, WasteCategory>>(INITIAL_WASTE_DATA);
  const [customCatInput, setCustomCatInput] = useState('');
  const [customMaterialInputs, setCustomMaterialInputs] = useState<Record<string, string>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isB3, setIsB3] = useState(false);

  const handleAddCustomCategory = () => {
    if (!customCatInput.trim()) return;
    const newKey = customCatInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');

    if (!wasteData[newKey]) {
      setWasteData(prev => ({
        ...prev,
        [newKey]: { label: customCatInput.trim(), materials: [] }
      }));
    }
    if (!selectedCategories.includes(newKey)) {
      setSelectedCategories(prev => [...prev, newKey]);
    }
    setCustomCatInput('');
  };

  const handleAddCustomMaterial = (catKey: string) => {
    const matName = customMaterialInputs[catKey]?.trim();
    if (!matName) return;

    if (wasteData[catKey]?.materials.includes(matName)) {
      setCustomMaterialInputs(prev => ({ ...prev, [catKey]: '' }));
      return;
    }

    setWasteData(prev => ({
      ...prev,
      [catKey]: {
        ...prev[catKey]!,
        materials: [...(prev[catKey]?.materials || []), matName]
      }
    }));

    if (!selectedMaterials.includes(matName)) {
      setSelectedMaterials(prev => [...prev, matName]);
    }

    setCustomMaterialInputs(prev => ({ ...prev, [catKey]: '' }));
  };

  const toggleCategory = (catKey: string) => {
    if (selectedCategories.includes(catKey)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catKey));
      const materialsToRemove = wasteData[catKey]!.materials;
      setSelectedMaterials(selectedMaterials.filter(m => !materialsToRemove.includes(m)));
      if (catKey === 'hazardous') setIsB3(false);
    } else {
      setSelectedCategories([...selectedCategories, catKey]);
      if (catKey === 'hazardous') setIsB3(true);
    }
  };

  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/en/dashboard/recycler'); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFDF9] px-4 py-12 font-[family-name:var(--font-creato-display)]">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">
            Recycler Sign Up
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Join our network to source industrial waste and turn it into valuable resources.
          </p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleSignUp}>
          
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company name</label>
              <input type="text" required placeholder="PlastiCycle Nusantara" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">NPWP / NIB</label>
              <input type="text" required placeholder="Masukkan 15-16 digit NPWP / NIB" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20" />
              <span className="text-[10px] font-bold text-slate-400">Required for B2B verification</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email address</label>
              <input type="email" required placeholder="ops@plasticycle.co.id" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
              <input type="password" required placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20" />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="mb-6 text-lg font-black tracking-tight text-slate-800">Company location</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Province</label>
                <select value={province} onChange={handleProvinceChange} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20">
                  {provinces.map(prov => <option key={prov} value={prov}>{prov}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">City / Kabupaten</label>
                <select value={city} onChange={handleCityChange} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20">
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Postcode</label>
                <select value={postcode} onChange={(e) => setPostcode(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20">
                  {postcodes.map(pc => <option key={pc} value={pc}>{pc}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="mb-6 text-lg font-black tracking-tight text-slate-800">What do you accept?</h2>
            
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Waste Categories</label>
                
                <div className="flex flex-wrap gap-2">
                  {Object.keys(wasteData).map((catKey) => {
                    const isSelected = selectedCategories.includes(catKey);
                    return (
                      <button key={catKey} type="button" onClick={() => toggleCategory(catKey)} className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all ${isSelected ? 'border-[#608334] bg-[#608334] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:border-[#608334] hover:text-[#608334]'}`}>
                        {isSelected ? '✓ ' : '+ '}{wasteData[catKey]!.label}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-2 pl-4 transition-all focus-within:border-[#608334] focus-within:ring-2 focus-within:ring-[#608334]/20">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Other:</span>
                  <input type="text" value={customCatInput} onChange={(e) => setCustomCatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomCategory(); } }} placeholder="e.g. Biowaste" className="w-full bg-transparent px-2 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none" />
                  <button type="button" onClick={handleAddCustomCategory} className="rounded-lg bg-[#CBDDB5] px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-[#608334] transition-colors hover:bg-[#608334] hover:text-white">Add</button>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Select all categories or add your own custom category</span>
              </div>

              {selectedCategories.length > 0 && (
                <div className="mt-2 flex flex-col gap-6 rounded-2xl border border-[#CBDDB5] bg-[#F7FEEF] p-6">
                  <label className="text-sm font-bold uppercase tracking-widest text-[#608334]">Specify Acceptable Materials</label>
                  
                  {selectedCategories.map(catKey => {
                    const catData = wasteData[catKey];
                    if (!catData) return null; 

                    return (
                      <div key={catKey} className="flex flex-col gap-3">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-600 border-b border-[#CBDDB5]/40 pb-1">{catData.label}</span>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {catData.materials.map(mat => {
                            const isSelected = selectedMaterials.includes(mat);
                            return (
                              <button key={mat} type="button" onClick={() => toggleMaterial(mat)} className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${isSelected ? 'border-[#608334] bg-[#608334] text-white shadow-sm' : 'border-slate-300 bg-white text-slate-600 hover:border-[#608334] hover:text-[#608334]'}`}>
                                {isSelected ? '✓ ' : '+ '}{mat}
                              </button>
                            );
                          })}

                          <div className="flex items-center gap-1 rounded-lg border border-[#CBDDB5] bg-white p-1 shadow-sm transition-all focus-within:border-[#608334] focus-within:ring-2 focus-within:ring-[#608334]/20">
                            <input type="text" value={customMaterialInputs[catKey] || ''} onChange={(e) => setCustomMaterialInputs(prev => ({...prev, [catKey]: e.target.value}))} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomMaterial(catKey); } }} placeholder={`+ add type of ${catData.label.toLowerCase()}...`} className="w-40 bg-transparent px-2 text-[11px] font-bold text-slate-600 outline-none placeholder:text-slate-400" />
                            <button type="button" onClick={() => handleAddCustomMaterial(catKey)} className="rounded-md bg-[#F7FEEF] px-2 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#608334] hover:bg-[#CBDDB5] hover:text-slate-800 transition-colors">Add</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-2 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Processing capacity</label>
                  <div className="flex items-center gap-3">
                    <input type="number" min="0" required placeholder="3000" className="w-32 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20" />
                    <span className="text-sm font-black text-slate-400">tons</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="b3-certified" checked={isB3} onChange={(e) => setIsB3(e.target.checked)} className="h-5 w-5 cursor-pointer rounded border-slate-300 bg-white accent-[#608334] transition-all" />
                  <label htmlFor="b3-certified" className="cursor-pointer text-sm font-bold text-slate-600">We are certified for B3 (hazardous) waste</label>
                </div>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company description</label>
                <textarea rows={4} placeholder="Brief description of your recycling capabilities..." className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-bold text-slate-700 placeholder-slate-300 outline-none transition-all focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20"></textarea>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8">
            <button type="submit" className="w-full rounded-xl bg-[#608334] py-4 text-base font-black text-white shadow-sm transition-all hover:bg-[#4d6929] active:scale-[0.98]">
              Create Recycler Account
            </button>
          </div>
          
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{' '}<Link href="/sign-in" className="font-bold text-[#608334] hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}