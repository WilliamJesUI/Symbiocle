"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/libs/Supabase';

const INITIAL_CHAT: any[] = [];

const CHAT_TEMPLATES = [
  "Are there any logistics or pickup fees associated with this transaction?",
  "When is the earliest your team can schedule a fleet pickup?",
  "Is pre-sorting by color required prior to collection?",
  "We will proceed with the details exactly as specified on the platform."
];

function FactoryChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const connectionId = searchParams.get('connectionId');

  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [inputValue, setInputValue] = useState('');
  const [hasReplied, setHasReplied] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [recyclerName, setRecyclerName] = useState('EcoPack Solutions');
  const [recyclerInitials, setRecyclerInitials] = useState('ES');

  // Load real recycler name if connectionId provided
  useEffect(() => {
    if (!connectionId) return;
    const load = async () => {
      const { data: conn } = await supabase
        .from('Connections')
        .select('recycling_company_id, status, RecyclingCompanies ( name )')
        .eq('id', connectionId)
        .single();
      if (conn) {
        const name = (conn as any).RecyclingCompanies?.name;
        if (name) {
          setRecyclerName(name);
          setRecyclerInitials(name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase());
        }
        if ((conn as any).status === 'completed') {
          setIsFinalized(true);
        }
      }
    };
    load();
  }, [connectionId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isFinalized) return;

    setMessages([...messages, {
      id: Date.now(),
      sender: 'me',
      type: 'text',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setInputValue('');
    setHasReplied(true);
  };

  const handleFinalize = async () => {
    setIsFinalized(true);
    
    // 🚨 JEBAKAN 1: Cek apakah ID-nya kebaca
    if (!connectionId) {
      alert("⚠️ GAGAL: connectionId KOSONG! Cek URL lu, apakah ada ?connectionId=...");
    } else {
      // 🚨 JEBAKAN 2: Cek apakah Supabase mau nerima update-nya
      const { data, error } = await supabase
        .from('Connections')
        .update({ status: 'completed' })
        .eq('id', connectionId)
        .select(); // WAJIB ada .select() biar kita dapat feedback dari DB

      if (error) {
        alert(`⚠️ GAGAL UPDATE DB: ${error.message}`);
        console.error('Supabase Error:', error);
      } else if (data && data.length === 0) {
        alert(`⚠️ ANEH: Gak ada koneksi dengan ID ${connectionId} di Database lu!`);
      } else {
        console.log("✅ UPDATE BERHASIL DI DB:", data);
        router.refresh(); // Bersihin cache biar dashboard langsung update
      }
    }

    // Tampilkan pesan chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'system',
        type: 'system',
        text: `Connection Finalized!\n\nYou may now proceed with the logistics arrangement directly with ${recyclerName}:\n\nPhone: +62 811-9999-8888\nEmail: logistics@${recyclerName.toLowerCase().replace(/\s+/g, '')}.co.id\nHQ: Kawasan Industri Jababeka, Bekasi`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
};

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-6 font-[family-name:var(--font-creato-display)] lg:flex-row">
      <div className="hidden w-1/3 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black tracking-tight text-slate-800">Messages</h2>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-400">Search</span>
            <input type="text" placeholder="Search factory or material..." className="w-full bg-transparent text-sm font-bold outline-none placeholder:font-medium placeholder:text-slate-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="cursor-pointer rounded-xl border border-[#CBDDB5] bg-[#F7FEEF] p-4 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-800">{recyclerName}</span>
              <span className="text-[10px] font-bold text-slate-400">Online</span>
            </div>
            <p className="mt-1 truncate text-xs font-bold text-[#608334]">
              {isFinalized ? 'Connection Finalized ✨' : messages.length === 0 ? 'Start a conversation...' : 'Waiting for reply...'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white p-5 md:p-6">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-xl text-slate-400 lg:hidden">Back</button>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CBDDB5] bg-[#F7FEEF] text-lg font-black text-[#608334]">
              {recyclerInitials}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">{recyclerName}</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className={`flex h-2 w-2 rounded-full ${isFinalized ? 'bg-slate-300' : 'bg-green-500'}`}></span>
                {isFinalized ? 'Connected' : 'Discussion in progress'}
              </div>
            </div>
          </div>
          {hasReplied && !isFinalized && (
            <button onClick={handleFinalize} className="animate-fade-in rounded-xl bg-[#608334] px-5 py-2.5 text-sm font-black text-white shadow-sm transition-all hover:bg-[#4d6929]">
              Finalize Connection
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          <div className="flex flex-col gap-6">
            {messages.map((msg) => {
              if (msg.type === 'system') {
                return (
                  <div key={msg.id} className="mx-auto my-4 w-full max-w-sm animate-fade-in rounded-2xl border border-[#CBDDB5] bg-[#F7FEEF] p-6 text-center shadow-sm">
                    <p className="whitespace-pre-line text-sm font-black leading-relaxed text-[#608334]">{msg.text}</p>
                    <span className="mt-3 block text-[10px] font-bold text-slate-400">{msg.time}</span>
                  </div>
                );
              }
              const isMe = msg.sender === 'me';
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm font-medium leading-relaxed shadow-sm md:max-w-[70%] ${isMe ? 'rounded-br-none bg-[#608334] text-white' : 'rounded-bl-none border border-slate-200 bg-white text-slate-700'}`}>
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[10px] font-bold text-slate-400">{msg.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white p-4">
          {!isFinalized && (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CHAT_TEMPLATES.map((tpl, i) => (
                <button key={i} onClick={() => setInputValue(tpl)} className="whitespace-nowrap rounded-full border border-[#CBDDB5] bg-[#F7FEEF] px-4 py-1.5 text-[11px] font-bold text-[#608334] hover:bg-[#608334] hover:text-white transition-colors">
                  {tpl}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={isFinalized} placeholder={isFinalized ? "Chat closed. Connection finalized." : "Type your message or use a template..."} className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#608334] focus:bg-white focus:ring-2 focus:ring-[#608334]/20 disabled:bg-slate-100 disabled:text-slate-400" />
            <button type="submit" disabled={isFinalized} className="flex h-12 items-center justify-center rounded-xl bg-slate-800 px-6 text-sm font-black text-white hover:bg-slate-700 disabled:bg-slate-300">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function FactoryChatPage() {
  return (
    <Suspense fallback={<div className="flex h-[calc(100vh-120px)] items-center justify-center"><p className="text-sm font-bold text-slate-500">Loading...</p></div>}>
      <FactoryChatContent />
    </Suspense>
  );
}