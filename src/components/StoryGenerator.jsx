import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles } from 'lucide-react';
import { TONES } from '../constants';
import { supabase } from '../integrations/supabase/client';

const StoryGenerator = () => {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("dramatic");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateStory = async () => {
    if (!idea.trim()) {
      setError("Veuillez décrire votre idée d'histoire.");
      return;
    }

    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    setLoading(true);
    setError(null);
    setStory(null);

    const toneLabel = TONES.find(t => t.id === tone)?.label;

    const prompt = `Tu es un écrivain et conteur d'élite. Ta mission est de transformer l'idée suivante en une histoire captivante, immersive et bien structurée.
    
    IDÉE DE DÉPART : ${idea}
    TONALITÉ : ${toneLabel}
    
    STRUCTURE ATTENDUE :
    1. Un titre accrocheur.
    2. Une introduction qui pose le décor et l'ambiance.
    3. Un développement riche en détails sensoriels et en émotions.
    4. Un dénouement mémorable ou une morale percutante.
    
    Rédige l'histoire complète en français, avec un style littéraire de haute qualité.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-001",
          "messages": [{ "role": "user", "content": prompt }]
        })
      });

      const data = await response.json();
      const text = data.choices[0].message.content;
      setStory(text);

      // Sauvegarde dans l'historique
      await supabase.from('scripts').insert([{
        content: text,
        platform: "Histoires",
        tone: toneLabel,
        image_provided: false
      }]);

    } catch (err) {
      setError("Erreur lors de la génération. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-[32px] p-8 h-fit">
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6">Configuration</h3>
          
          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-400 mb-3 uppercase">Votre idée</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#FF9F43]/50 transition-colors resize-none"
              placeholder="Ex: Un voyageur temporel qui oublie sa propre époque..."
              rows={6}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-400 mb-3 uppercase">Ambiance</label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${tone === t.id ? 'bg-[#FF9F43] text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                >
                  {t.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={generateStory}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#FF9F43] text-black font-black text-sm shadow-[0_10px_30px_rgba(255,159,67,0.2)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "RÉDACTION EN COURS..." : "✨ GÉNÉRER L'HISTOIRE"}
          </button>
        </div>

        <div className="glass-panel rounded-[40px] p-8 min-h-[500px] flex flex-col">
          {loading ? (
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#FF9F43]/10 border-t-[#FF9F43] rounded-full animate-spin mb-4"></div>
              <p className="text-[#FF9F43] font-bold text-xs tracking-widest">L'IA ÉCRIT VOTRE RÉCIT...</p>
            </div>
          ) : story ? (
            <div className="slide-up">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-[#FF9F43]" />
                  <span className="font-black text-sm uppercase tracking-wider">Votre Histoire</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#FF9F43] transition-all"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {story}
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center opacity-20 text-center">
              <Sparkles size={64} className="mb-6" />
              <p className="text-sm font-bold max-w-[200px]">Donnez une idée à gauche pour voir la magie opérer.</p>
            </div>
          )}
          {error && <p className="text-red-400 text-xs font-bold mt-4 text-center">⚠️ {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;