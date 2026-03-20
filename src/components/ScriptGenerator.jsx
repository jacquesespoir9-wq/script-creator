import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS, DURATIONS, TONES } from '../constants';
import { supabase } from '../supabaseClient';
import { GoogleGenerativeAI } from "@google/generative-ai";
import PlatformIcon from './PlatformIcon';

const ScriptGenerator = ({ initialPlatformId }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [ideaText, setIdeaText] = useState("");
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

  const generateScript = async () => {
    if (!imageBase64 && !ideaText.trim()) {
      setError("Veuillez importer une image ou décrire votre idée.");
      return;
    }
    
    const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
    if (!API_KEY) {
      setError("ERREUR : Clé API Google Gemini non configurée.");
      return;
    }

    setLoading(true);
    setError(null);
    setScript(null);

    const platformInfo = PLATFORMS.find((p) => p.id === platform);
    const toneLabel = TONES.find((t) => t.id === tone)?.label;

    // Custom instructions based on the mode
    let specializedPrompt = "";
    if (platform === 'design') {
      specializedPrompt = `Tu es un expert en Design Graphique. Analyse l'image et crée un script tutoriel étape par étape pour reproduire ce design. Structure le script avec Accroche, Matériel requis, Étapes détaillées, et Résultat final.`;
    } else if (platform === 'motivation') {
      specializedPrompt = `Tu es un coach en Motivation. Analyse l'image et crée un script inspirant et puissant. Utilise des phrases percutantes, une narration émotionnelle et termine par un message fort pour booster l'audience.`;
    } else if (platform === 'copy') {
      specializedPrompt = `Tu es un expert en Copywriting. Analyse l'image et crée un texte de vente persuasif utilisant la méthode AIDA (Attention, Intérêt, Désir, Action). Optimize le texte pour captiver et convertir.`;
    } else if (platform === 'desc') {
      specializedPrompt = `Tu es un Social Media Manager. Analyse l'image et crée une description optimisée SEO pour les réseaux sociaux. Inclus des hashtags pertinents, une légende captivante et un appel à l'action clair.`;
    }

    const fullPrompt = `Mode : ${platformInfo.label}
Tonalité : ${toneLabel}
Durée cible : ${duration} secondes

${specializedPrompt}

Voici le contexte supplémentaire fourni par l'utilisateur : ${ideaText}

Génère un script complet, structuré et prêt à l'emploi.`;

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let contentParts = [fullPrompt];
      if (imageBase64) {
        contentParts.push({
          inlineData: {
            data: imageBase64.data,
            mimeType: imageBase64.type
          }
        });
      }

      const result = await model.generateContent(contentParts);
      const response = await result.response;
      const text = response.text();
      
      if (!text) throw new Error("Réponse vide de l'IA.");
      
      setScript(text);

      // Save to Supabase
      supabase.from('scripts').insert([{
        content: text,
        platform: platformInfo.label,
        duration: duration,
        tone: tone,
        image_provided: !!imageBase64
      }]).then(({ error: sbError }) => { if (sbError) console.error("Database Error:", sbError); });

    } catch (err) {
      console.error(err);
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

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <style>{`
        .generator-container { display: grid; grid-template-columns: 420px 1fr; gap: 40px; }
        .glass-panel { background: rgba(18,18,24,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); }
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
        }
        .generate-btn {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          background: #C8FF57;
          color: #0D0D0F;
          font-weight: 900;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: transform 0.2s;
        }
        .generate-btn:hover:not(:disabled) { transform: translateY(-4px); }
        .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 1000px) { .generator-container { grid-template-columns: 1fr; } }
      `}</style>

      <div className="generator-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="glass-panel" style={{ borderRadius: 32, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#666", textTransform: "uppercase", display: "block", marginBottom: 16 }}>1. Source de contenu</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <input id="img-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />
              {!image ? (
                <label htmlFor="img-upload" style={{ display: "block", cursor: "pointer" }}>
                  <div style={{ border: "2px dashed rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>✨</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Importer une image</div>
                  </div>
                </label>
              ) : (
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
                  <img src={image} alt="preview" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  <button onClick={() => { setImage(null); setImageBase64(null); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", borderRadius: "50%", width: 32, height: 32, cursor: "pointer" }}>✕</button>
                </div>
              )}
              <textarea className="text-area-custom" placeholder="Décrivez votre idée ou donnez du contexte..." rows={4} value={ideaText} onChange={(e) => setIdeaText(e.target.value)} />
            </div>
          </div>

          <div className="glass-panel" style={{ borderRadius: 32, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#666", textTransform: "uppercase", display: "block", marginBottom: 16 }}>2. Options</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12 }}>TONALITÉ</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TONES.map((t) => (
                    <button key={t.id} onClick={() => setTone(t.id)}
                      style={{ padding: "10px 18px", borderRadius: 12, background: tone === t.id ? "#C8FF57" : "#111115", color: tone === t.id ? "#0D0D0F" : "#666", border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button disabled={loading} onClick={generateScript} className="generate-btn">
            {loading ? "GÉNÉRATION EN COURS..." : `✨ GÉNÉRER POUR ${selectedPlatform?.label.toUpperCase()}`}
          </button>
        </div>

        <div className="glass-panel" style={{ borderRadius: 40, padding: 40, minHeight: 600 }}>
          {error && <div style={{ background: "rgba(255, 50, 50, 0.1)", color: "#ff6b6b", padding: 20, borderRadius: 16, marginBottom: 24, border: '1px solid rgba(255,50,50,0.2)' }}>⚠️ {error}</div>}
          
          {!script && !loading && (
            <div style={{ height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
              <div style={{ fontSize: 80, marginBottom: 24 }}>✨</div>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Mode {selectedPlatform?.label}</h3>
              <p style={{ fontSize: 14, textAlign: "center" }}>Chargez une image ou écrivez votre idée pour commencer.</p>
            </div>
          )}

          {loading && (
            <div style={{ height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, border: "4px solid rgba(200,255,87,0.1)", borderTopColor: "#C8FF57", borderRadius: "50%", animation: 'spin 1s linear infinite' }} />
              <div style={{ marginTop: 24, fontWeight: 800, color: '#C8FF57' }}>ANALYSE EN COURS...</div>
            </div>
          )}

          {script && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <PlatformIcon id={selectedPlatform?.id} size={32} color="#C8FF57" />
                  <span style={{ fontWeight: 800, fontSize: 18 }}>Script {selectedPlatform?.label}</span>
                </div>
                <button onClick={copyScript} style={{ padding: "10px 20px", borderRadius: 12, background: copied ? "#C8FF57" : "rgba(255,255,255,0.05)", color: copied ? "#0D0D0F" : "#fff", border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {copied ? "COPIÉ !" : "COPIER"}
                </button>
              </div>
              <div style={{ fontSize: 15, color: "#C8C5C0", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                {script}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ScriptGenerator;