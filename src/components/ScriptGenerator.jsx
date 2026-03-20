import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS, DURATIONS, TONES } from '../constants';
import { supabase } from '../integrations/supabase/client';
import PlatformIcon from './PlatformIcon';
import { Video, Image as ImageIcon } from 'lucide-react';

const ScriptGenerator = ({ initialPlatformId, showImageUpload = true }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [ideaText, setIdeaText] = useState("");
  const [tone, setTone] = useState("educational");
  const [format, setFormat] = useState("video"); // 'video' or 'image'
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
      setError("Veuillez décrire votre idée.");
      return;
    }
    
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!API_KEY) {
      setError("ERREUR : Clé API OpenRouter non configurée.");
      return;
    }

    setLoading(true);
    setError(null);
    setScript(null);

    const platformInfo = PLATFORMS.find((p) => p.id === platform) || PLATFORMS[0];
    const toneLabel = TONES.find((t) => t.id === tone)?.label;

    let specializedPrompt = "";
    const formatContext = format === 'video' 
      ? "Le contenu doit être structuré comme un script vidéo dynamique (Accroche, Corps, Conclusion) avec des indications de rythme." 
      : "Le contenu doit être structuré pour une publication image/carrousel (Légende percutante, texte sur l'image, hashtags).";

    if (platform === 'design') {
      specializedPrompt = `Tu es un expert en Design Graphique. ${formatContext} Analyse l'idée et crée un contenu pour reproduire ce design.`;
    } else if (platform === 'motivation') {
      specializedPrompt = `Tu es un coach en Motivation. ${formatContext} Analyse l'idée et crée un contenu inspirant et puissant.`;
    } else if (platform === 'story') {
      specializedPrompt = `Tu es un écrivain et conteur d'élite. ${formatContext} Analyse l'idée et crée une histoire captivante et immersive.`;
    } else if (platform === 'copy') {
      specializedPrompt = `Tu es un expert en Copywriting. ${formatContext} Analyse l'idée et crée un texte persuasif utilisant la méthode AIDA.`;
    } else if (platform === 'desc') {
      specializedPrompt = `Tu es un Social Media Manager expert. ${formatContext} Analyse l'idée et crée une description optimisée.`;
    }

    const fullPrompt = `CATÉGORIE : ${platformInfo.label}
FORMAT : ${format.toUpperCase()}
TONALITÉ : ${toneLabel}

${specializedPrompt}

CONTEXTE UTILISATEUR : ${ideaText}

Génère un contenu complet, structuré et prêt à l'emploi en français.`;

    try {
      const messages = [
        {
          role: "user",
          content: [
            { type: "text", text: fullPrompt }
          ]
        }
      ];

      if (imageBase64) {
        messages[0].content.push({
          type: "image_url",
          image_url: {
            url: `data:${imageBase64.type};base64,${imageBase64.data}`
          }
        });
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ScriptGen",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-001",
          "messages": messages
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "Erreur API");

      const text = data.choices[0].message.content;
      setScript(text);

      supabase.from('scripts').insert([{
        content: text,
        platform: platformInfo.label,
        tone: tone,
        image_provided: !!imageBase64
      }]).then(({ error: sbError }) => { if (sbError) console.error("Database Error:", sbError); });

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

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform) || PLATFORMS[0];

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
          background: ${selectedPlatform.color};
          color: #0D0D0F;
          font-weight: 900;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          box-shadow: 0 10px 20px ${selectedPlatform.color}22;
        }
        .generate-btn:hover:not(:disabled) { transform: translateY(-4px); filter: brightness(1.1); }
        .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 1000px) { .generator-container { grid-template-columns: 1fr; } }
      `}</style>

      <div className="generator-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="glass-panel" style={{ borderRadius: 32, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#666", textTransform: "uppercase", display: "block", marginBottom: 16, textAlign: 'center' }}>1. Source de contenu</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {showImageUpload && (
                <>
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
                </>
              )}
              <textarea className="text-area-custom" placeholder={showImageUpload ? "Décrivez votre idée ou donnez du contexte..." : "Décrivez votre idée d'histoire en détail..."} rows={showImageUpload ? 4 : 10} value={ideaText} onChange={(e) => setIdeaText(e.target.value)} />
            </div>
          </div>

          <div className="glass-panel" style={{ borderRadius: 32, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#666", textTransform: "uppercase", display: "block", marginBottom: 16, textAlign: 'center' }}>2. Options</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Format Selector */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12, textAlign: 'center' }}>FORMAT DE PUBLICATION</div>
                <div style={{ display: "flex", gap: 10, justifyContent: 'center' }}>
                  <button 
                    onClick={() => setFormat("video")}
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      padding: "16px", 
                      borderRadius: 16, 
                      background: format === "video" ? selectedPlatform.color : "rgba(255,255,255,0.03)", 
                      color: format === "video" ? "#0D0D0F" : "#666", 
                      border: format === "video" ? 'none' : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Video size={20} />
                    <span style={{ fontSize: 10, fontWeight: 800 }}>VIDÉO</span>
                  </button>
                  <button 
                    onClick={() => setFormat("image")}
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      padding: "16px", 
                      borderRadius: 16, 
                      background: format === "image" ? selectedPlatform.color : "rgba(255,255,255,0.03)", 
                      color: format === "image" ? "#0D0D0F" : "#666", 
                      border: format === "image" ? 'none' : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <ImageIcon size={20} />
                    <span style={{ fontSize: 10, fontWeight: 800 }}>IMAGE</span>
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12, textAlign: 'center' }}>TONALITÉ</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: 'center' }}>
                  {TONES.map((t) => (
                    <button key={t.id} onClick={() => setTone(t.id)}
                      style={{ padding: "10px 18px", borderRadius: 12, background: tone === t.id ? selectedPlatform.color : "#111115", color: tone === t.id ? "#0D0D0F" : "#666", border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
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
              <div style={{ fontSize: 80, marginBottom: 24 }}>{selectedPlatform.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Mode {selectedPlatform?.label}</h3>
              <p style={{ fontSize: 14, textAlign: "center" }}>{showImageUpload ? "Chargez une image ou écrivez votre idée pour commencer." : "Décrivez votre idée d'histoire pour commencer."}</p>
            </div>
          )}

          {loading && (
            <div style={{ height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, border: `4px solid ${selectedPlatform.color}11`, borderTopColor: selectedPlatform.color, borderRadius: "50%", animation: 'spin 1s linear infinite' }} />
              <div style={{ marginTop: 24, fontWeight: 800, color: selectedPlatform.color }}>ANALYSE EN COURS...</div>
            </div>
          )}

          {script && (
            <div>
              <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", gap: 20, marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <PlatformIcon id={selectedPlatform?.id} size={32} color={selectedPlatform.color} />
                  <span style={{ fontWeight: 800, fontSize: 18 }}>Script {selectedPlatform?.label}</span>
                </div>
                <button onClick={copyScript} style={{ padding: "10px 20px", borderRadius: 12, background: copied ? selectedPlatform.color : "rgba(255,255,255,0.05)", color: copied ? "#0D0D0F" : "#fff", border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {copied ? "COPIÉ !" : "COPIER LE SCRIPT"}
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