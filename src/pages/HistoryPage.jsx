"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import { Trash2, Clock, Copy, Check, Instagram, Music2, Youtube, Facebook } from 'lucide-react';

const IconMap = {
  Instagram,
  Music2,
  Youtube,
  Facebook
};

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
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 24px" }}>
      <BackButton />
      
      <div className="slide-up" style={{ textAlign: 'center', marginBottom: 56, marginTop: 40 }}>
        <h1 style={{ 
          fontFamily: "'Outfit', sans-serif", 
          fontSize: "clamp(32px, 8vw, 48px)", 
          marginBottom: 16, 
          fontWeight: 800 
        }}>
          Votre <span style={{ color: "#C8FF57" }}>Historique</span>
        </h1>
        <p style={{ color: "#888", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
          Retrouvez et réutilisez tous les scripts que vous avez générés précédemment.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin-slow w-12 h-12 border-4 border-[#C8FF57]/10 border-t-[#C8FF57] rounded-full"></div>
        </div>
      ) : scripts.length === 0 ? (
        <div className="glass-panel rounded-[32px] py-20 text-center slide-up">
          <div className="text-6xl mb-6 opacity-20">📭</div>
          <p className="text-gray-500 font-medium">Aucun script enregistré pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 slide-up">
          {scripts.map((script) => {
            const platform = PLATFORMS.find(p => p.label === script.platform) || PLATFORMS[0];
            const Icon = IconMap[platform.iconName];
            return (
              <div key={script.id} className="glass-panel rounded-[32px] p-8 border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: platform.color + '15', color: platform.color }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold font-outfit text-lg">{script.platform}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Clock size={12} />
                        {new Date(script.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyToClipboard(script.content, script.id)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-[#C8FF57]"
                    >
                      {copiedId === script.id ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                    <button 
                      onClick={() => deleteScript(script.id)}
                      className="p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 transition-all text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap mb-6 line-clamp-4 font-medium">
                  {script.content}
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {script.duration}s
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
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