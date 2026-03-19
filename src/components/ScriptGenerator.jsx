"use client";

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS, DURATIONS, TONES } from '../constants';
import { supabase } from '../integrations/supabase/client';

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
    if (!imageBase64) {
      setError("Veuillez d'abord importer une image de votre design.");
      return;
    }
    
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      setError("La clé API n'est pas détectée dans les Secrets.");
      return;
    }

    setLoading(true);
    setError(null);
    setScript(null);

    const platformInfo = PLATFORMS.find((p) => p.id === platform);
    const prompt = `Tu es un expert en création de contenu pour les réseaux sociaux, spécialisé dans les tutoriels de design graphique. 

Analyse cette image et crée un script complet pour une vidéo tutoriel de design graphique à publier sur ${platformInfo.label}.

Contexte du compte :
- Niche : Tutoriels design graphique exclusivement
- Audience : Débutants à intermédiaires en design
- Ton souhaité : ${TONES.find((t) => t.id === tone)?.label}
- Durée cible : ${duration} secondes

Génère un script structuré avec :

**ACCROCHE (0-3 sec)**
[Phrase d'accroche percutante basée sur l'image]

**INTRODUCTION (3-10 sec)**  
[Présentation rapide de ce qu'on va apprendre]

**CONTENU PRINCIPAL**
[Étapes détaillées du tutoriel avec timing précis]

**APPEL À L'ACTION (fin)**
[CTA adapté à ${platformInfo.label}]

**HASHTAGS RECOMMANDÉS**
[15-20 hashtags pertinents pour le design graphique et ${platformInfo.label}]

**DESCRIPTION DE LA VIDÉO**
[Description optimisée SEO pour ${platformInfo.label}]

Sois précis, concis et adapte le script au format ${platformInfo.label} (durée ${duration}s). Le script doit être directement utilisable pour filmer.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "ScriptGen",
        },
        body: JSON.stringify({
          "model": "google/gemini-flash-1.5",
          "messages": [
            {
              "role": "user",
              "content": [
                { "type": "text", "text": prompt },
                {
                  "type": "image_url",
                  "image_url": {
                    "url": `data:${imageBase64.type};base64,${imageBase64.data}`
                  }
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `Erreur API (${response.status})`);
      }

      const text = data.choices[0]?.message?.content;
      
      if (!text) throw new Error("L'IA n'a pas pu générer de texte.");
      
      setScript(text);

      // Sauvegarde dans Supabase
      try {
        await supabase
          .from('scripts')
          .insert([{
            content: text,
            platform: platformInfo.label,
            duration: duration,
            tone: tone,
            image_provided: true
          }]);
      } catch (sbError) {
        console.warn("Note: Sauvegarde DB échouée.", sbError);
      }

    } catch (err) {
      console.error("Erreur complète:", err);
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

  const reset = () => {
    setImage(null);
    setImageBase64(null);
    setScript(null);
    setError(null);
  };

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
      <style>{`
        .generator-container {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 32px;
        }
        .option-btn {
          transition: all 0.2s ease;
          border: 1px solid rgba(255,255,255,0.05) !important;
        }
        .option-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .active-platform {
          background: rgba(255,255,255,0.08) !important;
          border-color: currentColor !important;
        }
        @media (max-width: 950px) {
          .generator-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="generator-container">
        {/* LEFT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Upload */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 24, border: "none" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 16 }}>1. Image du Design</span>
            <input
              id="img-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = ""; }}
            />

            {!image ? (
              <label htmlFor="img-upload" style={{ display: "block", cursor: "pointer" }}>
                <div style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: 16, padding: "40px 20px", textAlign: "center", transition: "all 0.2s ease" }} className="hover:border-[#C8FF57]/30">
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🎨</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EDE8", marginBottom: 4 }}>Importer un design</div>
                  <div style={{ fontSize: 12, color: "#555" }}>Analyse visuelle par l'IA</div>
                </div>
              </label>
            ) : (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
                <img src={image} alt="preview" style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", pointerEvents: "none" }} />
                <button onClick={reset} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", border: "none", color: "#fff", borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>✕ Retirer</button>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="glass-panel" style={{ borderRadius: 24, padding: 24, border: "none", display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>2. Plateforme</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {PLATFORMS.map((p) => (
                  <button key={p.id} className={`option-btn ${platform === p.id ? 'active-platform' : ''}`} onClick={() => changePlatform(p.id)}
                    style={{ padding: "12px 8px", borderRadius: 14, background: "#0F0F13", color: platform === p.id ? p.color : "#555", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{p.icon}</span>
                    {p.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>3. Durée & Ton</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
                  {DURATIONS.map((d) => (
                    <button key={d.id} onClick={() => setDuration(d.id)}
                      style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 10, background: duration === d.id ? "#C8FF57" : "#111115", color: duration === d.id ? "#0D0D0F" : "#555", fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer" }}>
                      {d.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {TONES.map((t) => (
                    <button key={t.id} onClick={() => setTone(t.id)}
                      style={{ padding: "8px 14px", borderRadius: 10, background: tone === t.id ? "#7B6EF6" : "#111115", color: tone === t.id ? "#fff" : "#555", fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer" }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button disabled={loading} onClick={generateScript}
              style={{ marginTop: 8, padding: "18px", borderRadius: 16, background: !loading ? "#C8FF57" : "#1A1A22", border: "none", color: !loading ? "#0D0D0F" : "#333", fontWeight: 800, fontSize: 15, cursor: !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: !loading ? "0 12px 24px rgba(200,255,87,0.2)" : "none" }}>
              {loading ? "Génération..." : "✨ Générer le Script"}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="glass-panel" style={{ flex: 1, borderRadius: 28, padding: 32, border: "none", minHeight: 500, position: "relative" }}>
            {error && (
              <div style={{ background: "rgba(255, 50, 50, 0.1)", border: "1px solid rgba(255, 50, 50, 0.2)", color: "#ff6b6b", padding: 16, borderRadius: 12, fontSize: 13, marginBottom: 20 }}>
                <strong>Erreur :</strong> {error}
              </div>
            )}

            {!script && !loading && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, opacity: 0.2 }}>
                <div style={{ fontSize: 64 }}>📄</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#F0EDE8", textAlign: "center" }}>Votre script apparaîtra ici<br /><span style={{ fontSize: 13, color: "#555" }}>Importez un design pour commencer</span></div>
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 24 }}>
                <div className="animate-spin-slow" style={{ width: 56, height: 56, border: "4px solid rgba(200,255,87,0.1)", borderTopColor: "#C8FF57", borderRadius: "50%" }} />
                <div style={{ fontSize: 14, color: "#888", fontWeight: 500 }}>L'IA analyse votre design...</div>
              </div>
            )}

            {script && (
              <div className="slide-up">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: selectedPlatform?.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{selectedPlatform?.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedPlatform?.label}</div>
                      <div style={{ fontSize: 11, color: "#555" }}>{duration}s • Ton {TONES.find(t => t.id === tone)?.label}</div>
                    </div>
                  </div>
                  <button onClick={copyScript} style={{ padding: "8px 16px", borderRadius: 12, background: copied ? "#C8FF57" : "rgba(255,255,255,0.05)", border: "none", color: copied ? "#0D0D0F" : "#F0EDE8", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
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