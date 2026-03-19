"use client";

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS, DURATIONS, TONES, FORMATS } from '../constants';
import { supabase } from '../integrations/supabase/client';
import PlatformIcon from './PlatformIcon';

const ScriptGenerator = ({ initialPlatformId }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [ideaText, setIdeaText] = useState("");
  const [duration, setDuration] = useState("60");
  const [tone, setTone] = useState("educational");
  const [format, setFormat] = useState("video");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const platform = initialPlatformId;

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

  const changePlatform = (id) => {
    navigate(`/${id}`);
  };

  const generateScript = async () => {
    if (!imageBase64 && !ideaText.trim()) {
      setError("Veuillez importer une image ou décrire votre idée de design.");
      return;
    }
    
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      setError("ERREUR : Clé API non détectée.");
      return;
    }

    setLoading(true);
    setError(null);
    setScript(null);

    const platformInfo = PLATFORMS.find((p) => p.id === platform);
    const formatLabel = FORMATS.find(f => f.id === format)?.label;
    
    let systemPrompt = `Tu es un expert en création de contenu pour les réseaux sociaux, spécialisé dans les tutoriels de design graphique. 
Crée un contenu optimisé pour ${platformInfo.label}.
Format de publication : ${formatLabel}.
Ton : ${TONES.find((t) => t.id === tone)?.label}.
${format === 'video' ? `Durée estimée : ${duration} secondes.` : ''}

CONSIGNES SPÉCIFIQUES :
${format === 'video' 
  ? "Génère un script vidéo complet avec ACCROCHE, INTRODUCTION, ÉTAPES DE RÉALISATION, CTA, HASHTAGS et DESCRIPTION." 
  : "Génère une légende captivante pour un post image/carrousel, avec une structure claire, des conseils textuels, un CTA, des HASHTAGS et une DESCRIPTION."
}`;

    let userContent = [];
    if (ideaText.trim()) {
      userContent.push({ type: "text", text: `Idée du design : ${ideaText.trim()}` });
    }
    if (imageBase64) {
      userContent.push({
        type: "image_url",
        image_url: { url: `data:${imageBase64.type};base64,${imageBase64.data}` }
      });
    }

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
            { "role": "system", "content": systemPrompt },
            { "role": "user", "content": userContent }
          ]
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Erreur IA.");

      const text = data.choices[0]?.message?.content;
      if (!text) throw new Error("Aucun contenu généré.");
      
      setScript(text);

      supabase.from('scripts').insert([{
        content: text,
        platform: platformInfo.label,
        duration: format === 'video' ? duration : null,
        tone: tone,
        image_provided: !!imageBase64,
        format: format
      }]).then(({ error }) => { if (error) console.warn("DB Error:", error); });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyScript = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform);

  const labelStyle = { 
    fontSize: 11, 
    fontWeight: 800, 
    color: "#666", 
    letterSpacing: "1.5px", 
    textTransform: "uppercase", 
    display: "block", 
    marginBottom: 16 
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <style>{`
        .generator-container { display: grid; grid-template-columns: 420px 1fr; gap: 40px; }
        .option-btn { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid rgba(255,255,255,0.03) !important; }
        .active-opt { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.15) !important; }
        .text-area-custom {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 20px;
          color: #F0EDE8;
          font-size: 14px;
          resize: none;
          outline: none;
          transition: all 0.3s ease;
        }
        .text-area-custom:focus { border-color: rgba(200,255,87,0.3); background: rgba(255,255,255,0.04); }
        .generate-btn {
          padding: 20px;
          border-radius: 20px;
          background: #C8FF57;
          color: #0D0D0F;
          font-weight: 900;
          font-size: 15px;
          letter-spacing: 0.5px;
          box-shadow: 0 20px 40px rgba(200,255,87,0.15);
          transition: all 0.3s ease;
        }
        .generate-btn:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 25px 50px rgba(200,255,87,0.25); }
        .generate-btn:active { transform: translateY(0); }
        @media (max-width: 1000px) { .generator-container { grid-template-columns: 1fr; } }
      `}</style>

      <div className="generator-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* SECTION 1: INPUT */}
          <div className="glass-panel" style={{ borderRadius: 32, padding: 28 }}>
            <span style={labelStyle}>1. Source du Design</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <input id="img-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />
              {!image ? (
                <label htmlFor="img-upload" style={{ display: "block", cursor: "pointer" }}>
                  <div style={{ border: "2px dashed rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 20px", textAlign: "center", transition: 'all 0.3s ease' }} className="hover:bg-white/5 hover:border-[#C8FF57]/20">
                    <div style={{ fontSize: 36, marginBottom: 12 }}>✨</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Importer votre visuel</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>PNG, JPG ou WebP</div>
                  </div>
                </label>
              ) : (
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={image} alt="preview" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  <button onClick={() => { setImage(null); setImageBase64(null); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", borderRadius: 12, width: 32, height: 32, cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
              )}
              <textarea className="text-area-custom" placeholder="Décrivez votre idée ou le concept du design..." rows={4} value={ideaText} onChange={(e) => setIdeaText(e.target.value)} />
            </div>
          </div>

          {/* SECTION 2: CONFIG */}
          <div className="glass-panel" style={{ borderRadius: 32, padding: 28 }}>
            <span style={labelStyle}>2. Configuration</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12 }}>FORMAT</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {FORMATS.map((f) => (
                    <button key={f.id} className={`option-btn ${format === f.id ? 'active-opt' : ''}`} onClick={() => setFormat(f.id)}
                      style={{ padding: "14px", borderRadius: 16, background: "#0F0F13", color: format === f.id ? "#C8FF57" : "#666", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: 'center', gap: 10 }}>
                      <span>{f.icon}</span> {f.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12 }}>TONALITÉ</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TONES.map((t) => (
                    <button key={t.id} onClick={() => setTone(t.id)}
                      style={{ padding: "10px 18px", borderRadius: 12, background: tone === t.id ? "#7B6EF6" : "#111115", color: tone === t.id ? "#fff" : "#666", fontSize: 12, fontWeight: 700, transition: 'all 0.3s ease' }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {format === 'video' && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12 }}>DURÉE</div>
                  <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                    {DURATIONS.map((d) => (
                      <button key={d.id} onClick={() => setDuration(d.id)}
                        style={{ padding: "10px 18px", borderRadius: 12, background: duration === d.id ? "#C8FF57" : "#111115", color: duration === d.id ? "#0D0D0F" : "#666", fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button disabled={loading} onClick={generateScript} className="generate-btn">
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div className="animate-spin" style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#000', borderRadius: '50%' }} />
                GÉNÉRATION...
              </div>
            ) : "✨ GÉNÉRER LE SCRIPT"}
          </button>
        </div>

        {/* RESULT AREA */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="glass-panel" style={{ flex: 1, borderRadius: 40, padding: 40, minHeight: 600, position: "relative", overflow: 'hidden' }}>
            {/* Background Decoration */}
            <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: selectedPlatform?.color, opacity: 0.03, filter: 'blur(100px)', borderRadius: '50%' }} />
            
            {error && <div style={{ background: "rgba(255, 50, 50, 0.1)", color: "#ff6b6b", padding: 20, borderRadius: 16, fontSize: 14, border: '1px solid rgba(255,50,50,0.2)', marginBottom: 24 }}>{error}</div>}
            
            {!script && !loading && (
              <div style={{ height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
                <div style={{ fontSize: 80, marginBottom: 24 }}>✍️</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Prêt à créer ?</h3>
                <p style={{ fontSize: 14, textAlign: "center", maxWidth: 300 }}>Configurez vos options à gauche pour générer votre script premium.</p>
              </div>
            )}

            {loading && (
              <div style={{ height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="animate-spin-slow" style={{ width: 64, height: 64, border: "4px solid rgba(200,255,87,0.05)", borderTopColor: "#C8FF57", borderRadius: "50%", marginBottom: 24 }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#C8FF57', letterSpacing: '2px' }}>ANALYSE DU DESIGN...</div>
              </div>
            )}

            {script && (
              <div className="slide-up">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: selectedPlatform?.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 10px 20px ${selectedPlatform?.color}33` }}>
                      <PlatformIcon id={selectedPlatform?.id} size={24} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800 }}>{selectedPlatform?.label}</div>
                      <div style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{format === 'video' ? `${duration}s • ` : ''}{TONES.find(t => t.id === tone)?.label}</div>
                    </div>
                  </div>
                  <button onClick={copyScript} style={{ padding: "12px 24px", borderRadius: 16, background: copied ? "#C8FF57" : "rgba(255,255,255,0.05)", color: copied ? "#0D0D0F" : "#F0EDE8", fontSize: 13, fontWeight: 800, transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {copied ? "✓ COPIÉ" : "⧉ COPIER"}
                  </button>
                </div>
                
                <div style={{ fontSize: 15, color: "#C8C5C0", lineHeight: 1.9, whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: script
                      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F0EDE8;display:block;margin-top:24px;margin-bottom:8px;font-size:17px;font-family:Outfit">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<span style="color:#C8FF57;font-weight:700">$1</span>')
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;