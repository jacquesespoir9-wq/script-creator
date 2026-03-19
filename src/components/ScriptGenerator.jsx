"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS, DURATIONS, TONES } from '../constants';
import { supabase } from '../integrations/supabase/client';
import { 
  AlertCircle, Check, Copy, Sparkles, Image as ImageIcon, 
  RefreshCw, X, Instagram, Music2, Youtube, Facebook 
} from 'lucide-react';

const IconMap = {
  Instagram,
  Music2,
  Youtube,
  Facebook
};

const ScriptGenerator = ({ initialPlatformId }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [duration, setDuration] = useState("60");
  const [tone, setTone] = useState("educational");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);

  const platform = initialPlatformId;

  useEffect(() => {
    const key = import.meta.env.VITE_OPENROUTER_API_KEY;
    setHasApiKey(!!key && key !== "");
  }, []);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setScript(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(",")[1];
      setImage(dataUrl); 
      setImageBase64({ data: base64, type: file.type });
    };
    reader.readAsDataURL(file);
  }, []);

  const generateScript = async () => {
    if (!imageBase64) {
      setError("Veuillez d'abord importer une image de votre design.");
      return;
    }
    
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      setError("Clé API manquante. Veuillez configurer VITE_OPENROUTER_API_KEY dans les Secrets.");
      setHasApiKey(false);
      return;
    }

    setLoading(true);
    setError(null);
    setScript(null);

    const platformInfo = PLATFORMS.find((p) => p.id === platform);
    const prompt = `Tu es un expert en création de contenu viral. Analyse ce design et crée un script de tutoriel pour ${platformInfo.label}. 
Ton : ${TONES.find((t) => t.id === tone)?.label}. Durée : ${duration}s. 
Structure : ACCROCHE CHOC, ÉTAPES CLÉS, CTA et HASHTAGS.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "ScriptGen",
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-001",
          "messages": [
            {
              "role": "user",
              "content": [
                { "type": "text", "text": prompt },
                { "type": "image_url", "image_url": { "url": `data:${imageBase64.type};base64,${imageBase64.data}` } }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Erreur API");

      const text = data.choices[0]?.message?.content;
      setScript(text);

      await supabase.from('scripts').insert([{
        content: text,
        platform: platformInfo.label,
        duration: duration,
        tone: tone,
        image_provided: true
      }]);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform);
  const SelectedIcon = selectedPlatform ? IconMap[selectedPlatform.iconName] : Sparkles;

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Options */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-[32px] p-6 border-white/5">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-4">1. Design Source</h3>
            {!image ? (
              <label className="group cursor-pointer block">
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center group-hover:border-[#C8FF57]/40 transition-all bg-white/[0.02]">
                  <ImageIcon className="mx-auto mb-4 text-gray-600 group-hover:text-[#C8FF57] transition-colors" size={40} />
                  <p className="text-sm font-semibold text-gray-400">Glissez votre design ici</p>
                </div>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden group">
                <img src={image} alt="Preview" className="w-full h-48 object-cover" />
                <button onClick={() => setImage(null)} className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white hover:bg-red-500 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="glass-panel rounded-[32px] p-6 border-white/5 space-y-6">
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-4">2. Configuration</h3>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => {
                  const Icon = IconMap[p.iconName];
                  return (
                    <button key={p.id} onClick={() => navigate(`/${p.id}`)} 
                      className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${platform === p.id ? 'bg-white/10 ring-1 ring-inset ring-white/20' : 'bg-white/[0.02] text-gray-500 hover:bg-white/5'}`}
                      style={{ color: platform === p.id ? p.color : '' }}>
                      <Icon size={16} /> {p.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {DURATIONS.map((d) => (
                  <button key={d.id} onClick={() => setDuration(d.id)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all flex-shrink-0 ${duration === d.id ? 'bg-[#C8FF57] text-black' : 'bg-white/5 text-gray-500'}`}>
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button key={t.id} onClick={() => setTone(t.id)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${tone === t.id ? 'bg-[#7B6EF6] text-white' : 'bg-white/5 text-gray-500'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generateScript} disabled={loading || !hasApiKey}
              className={`w-full py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 ${loading || !hasApiKey ? 'bg-white/5 text-gray-600' : 'bg-[#C8FF57] text-black shadow-[0_20px_40px_rgba(200,255,87,0.2)] hover:scale-[1.02]'}`}>
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? "ANALYSE EN COURS..." : "GÉNÉRER LE SCRIPT"}
            </button>

            {!hasApiKey && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-[10px] text-red-200 leading-relaxed font-medium">
                  <strong>ACTION REQUISE :</strong> Ajoutez votre clé <code className="bg-black/30 px-1 rounded">VITE_OPENROUTER_API_KEY</code> dans les Secrets de l'éditeur pour activer l'IA.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content / Result */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-[40px] p-8 min-h-[600px] border-white/5 relative overflow-hidden">
            {!script && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 opacity-20">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Prêt à créer ?</h3>
                <p className="text-sm max-w-xs">Importez votre design à gauche pour que l'IA puisse l'analyser et générer votre script viral.</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050508]/50 backdrop-blur-sm z-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-[#C8FF57]/10 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-t-[#C8FF57] rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-8 font-black text-xs tracking-[3px] text-[#C8FF57] animate-pulse">L'IA ANALYSE VOTRE DESIGN...</p>
              </div>
            )}

            {script && (
              <div className="slide-up space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: selectedPlatform?.color + '20', color: selectedPlatform?.color }}>
                      <SelectedIcon size={24} />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{selectedPlatform?.label}</h2>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{duration}s • Ton {tone}</p>
                    </div>
                  </div>
                  <button onClick={copyScript} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all ${copied ? 'bg-[#C8FF57] text-black' : 'bg-white/5 hover:bg-white/10'}`}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "COPIÉ !" : "COPIER LE SCRIPT"}
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-medium"
                    dangerouslySetInnerHTML={{
                      __html: script
                        .replace(/\*\*(.*?)\*\*/g, '<h4 class="text-[#C8FF57] font-black text-sm tracking-wider uppercase mt-8 mb-3">$1</h4>')
                        .replace(/\*(.*?)\*/g, '<span class="text-white font-bold">$1</span>')
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;