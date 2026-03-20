"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import { Trash2, Clock, Copy, Check } from 'lucide-react';
import PlatformIcon from '../components/PlatformIcon';

const HistoryPage = () => {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setScripts(data);
    setLoading(false);
  };

  const deleteScript = async (id) => {
    const { error } = await supabase.from('scripts').delete().eq('id', id);
    if (!error) setScripts(scripts.filter(s => s.id !== id));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <BackButton />
      <div className="text-center mb-12 slide-up">
        <h1 className="text-5xl md:text-7xl font-black mb-4 font-outfit tracking-tighter">
          Historique des <span className="text-[#C8FF57] drop-shadow-[0_0_30px_rgba(200,255,87,0.3)]">Scripts</span>
        </h1>
        <p className="text-gray-400 font-medium">Retrouvez toutes vos créations passées.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin-slow w-12 h-12 border-4 border-[#C8FF57]/10 border-top-[#C8FF57] rounded-full"></div>
        </div>
      ) : scripts.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500">Aucun script enregistré pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {scripts.map((script) => {
            const platform = PLATFORMS.find(p => p.label === script.platform) || PLATFORMS[0];
            return (
              <div key={script.id} className="glass-panel rounded-3xl p-6 slide-up">
                <div className="flex flex-col items-center mb-6">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2" style={{ background: platform.color + '22', color: platform.color }}>
                      <PlatformIcon id={platform.id} size={24} color={platform.id === 'tiktok' ? '#fff' : platform.color} />
                    </div>
                    <div>
                      <h3 className="font-bold font-outfit text-xl">{script.platform}</h3>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock size={12} />
                        {new Date(script.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button 
                      onClick={() => copyToClipboard(script.content, script.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-[#C8FF57] text-sm font-bold"
                    >
                      {copiedId === script.id ? <Check size={16} /> : <Copy size={16} />}
                      {copiedId === script.id ? "COPIÉ" : "COPIER"}
                    </button>
                    <button 
                      onClick={() => deleteScript(script.id)}
                      className="p-2 rounded-xl bg-red-500/5 hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-400 whitespace-pre-wrap mb-6 text-center max-w-2xl mx-auto">
                  {script.content}
                </div>
                <div className="flex justify-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {script.duration}s
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Ton {script.tone}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;