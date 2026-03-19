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
    
    if (!API_KEY || API_KEY === "") {
      setError("ERREUR : Clé API non détectée. Vérifiez vos Secrets et faites un REBUILD.");
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
    fontWeight: 700, 
    color: "#555", 
    letterSpacing: "1.5px", 
    textTransform: "uppercase", 
    display: "block", 
    marginBottom: 16 
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
      <style>{`
        .generator-container { display: grid; grid-template-columns: 400px 1fr; gap: 32px; }
        .option-btn { transition: all 0.2s ease; border: 1px solid rgba(255,255,255,0.05) !important; }
        .active-opt { background: rgba(255,255,255,0.08) !important; border-color: currentColor !important; }
        .text-area-custom {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 16px;
          color: #F0EDE8;
          font-size: 14px;
          resize: none;
          outline: none;
        }
        @media (max-width: 950px) { .generator-container { grid-template-columns: 1fr; } }
      `}</style>
      <div className="generator-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* OPTION 1 */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 24, border: "none" }}>
            <span style={labelStyle}>1. Image ou Idée</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input id="img-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />
              {!image ? (
                <label htmlFor="img-upload" style={{ display: "block", cursor: "pointer" }}>
                  <div style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }} className="hover:border-[#C8FF57]/30">
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎨</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Importer un design</div>
                  </div>
                </label>
              ) : (
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
                  <img src={image} alt="preview" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <button onClick={() => { setImage(null); setImageBase64(null); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 11 }}>✕</button>
                </div>
              )}
              <textarea className="text-area-custom" placeholder="Ou décrivez votre idée..." rows={3} value={ideaText} onChange={(e) => setIdeaText(e.target.value)} />
            </div>
          </div>

          {/* OPTION 2 */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 24, border: "none" }}>
            <span style={labelStyle}>2. Format de publication</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {FORMATS.map((f) => (
                <button key={f.id} className={`option-btn ${format === f.id ? 'active-opt' : ''}`} onClick={() => setFormat(f.id)}
                  style={{ padding: "12px 8px", borderRadius: 14, background: "#0F0F13", color: format === f.id ? "#C8FF57" : "#555", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{f.icon}</span> {f.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* OPTION 3 */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 24, border: "none" }}>
            <span style={labelStyle}>3. Plateforme</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {PLATFORMS.map((p) => (
                <button key={p.id} className={`option-btn ${platform === p.id ? 'active-opt' : ''}`} onClick={() => changePlatform(p.id)}
                  style={{ padding: "12px 8px", borderRadius: 14, background: "#0F0F13", color: platform === p.id ? p.color : "#555", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <PlatformIcon id={p.id} size={16} color={platform === p.id ? (p.id === 'tiktok' ? '#fff' : p.color) : "#555"} /> {p.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* OPTION 4 */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 24, border: "none" }}>
            <span style={labelStyle}>4. Options</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {format === 'video' && (
                <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                  {DURATIONS.map((d) => (
                    <button key={d.id} onClick={() => setDuration(d.id)}
                      style={{ padding: "8px 14px", borderRadius: 10, background: duration === d.id ? "#C8FF57" : "#111115", color: duration === d.id ? "#0D0D0F" : "#555", fontSize: 11, fontWeight: 700 }}>
                      {d.label}
                    </button>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TONES.map((t) => (
                  <button key={t.id} onClick={() => setTone(t.id)}
                    style={{ padding: "8px 14px", borderRadius: 10, background: tone === t.id ? "#7B6EF6" : "#111115", color: tone === t.id ? "#fff" : "#555", fontSize: 11, fontWeight: 700 }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button disabled={loading} onClick={generateScript}
            style={{ padding: "18px", borderRadius: 16, background: !loading ? "#C8FF57" : "#1A1A22", color: !loading ? "#0D0D0F" : "#333", fontWeight: 800, cursor: !loading ? "pointer" : "default" }}>
            {loading ? "Génération..." : "✨ Générer le Contenu"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="glass-panel" style={{ flex: 1, borderRadius: 28, padding: 32, border: "none", minHeight: 500, position: "relative" }}>
            {error && <div style={{ background: "rgba(255, 50, 50, 0.1)", color: "#ff6b6b", padding: 16, borderRadius: 12, fontSize: 13 }}>{error}</div>}
            {!script && !loading && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.2 }}>
                <div style={{ fontSize: 64 }}>📄</div>
                <div style={{ fontSize: 15, textAlign: "center" }}>Configurez votre post pour commencer</div>
              </div>
            )}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <div className="animate-spin-slow" style={{ width: 56, height: 56, border: "4px solid rgba(200,255,87,0.1)", borderTopColor: "#C8FF57", borderRadius: "50%" }} />
              </div>
            )}
            {script && (
              <div className="slide-up">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: selectedPlatform?.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                      <PlatformIcon id={selectedPlatform?.id} size={18} color={selectedPlatform?.id === 'tiktok' ? '#fff' : '#fff'} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedPlatform?.label} ({formatLabel})</div>
                  </div>
                  <button onClick={copyScript} style={{ padding: "8px 16px", borderRadius: 12, background: copied ? "#C8FF57" : "rgba(255,255,255,0.05)", color: copied ? "#0D0D0F" : "#F0EDE8", fontSize: 12, fontWeight: 700 }}>
                    {copied ? "✓ Copié" : "⧉ Copier"}
                  </button>
                </div>
                <div style={{ fontSize: 14, color: "#C8C5C0", lineHeight: 1.8, whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: script
                      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F0EDE8;display:block;margin-top:16px;font-size:15px">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em style="color:#C8FF57;font-style:normal;font-weight:600">$1</em>')
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