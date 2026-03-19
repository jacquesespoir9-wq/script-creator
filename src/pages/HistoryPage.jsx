"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import { Trash2, Clock, Copy, Check, History } from 'lucide-react';
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
      
      <div className="text-center mb-16 slide-up flex flex-col items-center">
        <div className="ai-badge mb-6">
          <History size={14} /> Archives Personnelles
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-outfit">
          Votre <span className="text-[#C8FF57]">Historique</span>
        </h1>
        <p className="text-gray-400 text-lg">Retrouvez et réutilisez vos meilleures créations.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin-slow w-12 h-12 border-4 border-[#C8FF57]/10 border-t-[#C8FF57] rounded-full"></div>
        </div>
      ) : scripts.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-[40px] border-dashed border-2 border-white/5">
          <div className="text-6xl mb-6 opacity-20">📂</div>
          <p className="text-gray-500 font-medium">Aucun script enregistré pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {scripts.map((script) => {
            const platform = PLATFORMS.find(p => p.label === script.platform) || PLATFORMS[0];
            return (
              <div key={script.id} className="premium-card glass-panel rounded-[32px] p-8 slide-up shimmer-effect">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: platform.color + '15', color: platform.color }}>
                      <PlatformIcon id={platform.id} size={24} color={platform.id === 'tiktok' ? '#fff' : platform.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl font-outfit">{script.platform}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={14} />
                        {new Date(script.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => copyToClipboard(script.content, script.id)}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#C8FF57] hover:text-[#0D0D0F] transition-all duration-300"
                    >
                      {copiedId === script.id ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                    <button 
                      onClick={() => deleteScript(script.id)}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-6 text-sm md:text-base line-clamp-4">
                  {script.content}
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 rounded-xl bg-white/5 text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-white/5">
                    {script.duration || 'N/A'}s
                  </span>
                  <span className="px-4 py-1.5 rounded-xl bg-white/5 text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-white/5">
                    Ton {script.tone}
                  </span>
                  <span className="px-4 py-1.5 rounded-xl bg-white/5 text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-white/5">
                    {script.format || 'Vidéo'}
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