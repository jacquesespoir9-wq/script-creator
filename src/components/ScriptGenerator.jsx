import React, { useState, useCallback } from 'react';
import { PLATFORMS, DURATIONS, TONES } from '../constants';

const ScriptGenerator = ({ initialPlatformId }) => {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [platform, setPlatform] = useState(initialPlatformId);
  const [duration, setDuration] = useState("60");
  const [tone, setTone] = useState("educational");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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
    if (!imageBase64) return;
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
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ScriptGen"
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet", 
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${imageBase64.type};base64,${imageBase64.data}`
                  }
                },
                { type: "text", text: prompt },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "";
      if (!text) throw new Error("Réponse vide de l'API. (Vérifiez votre clé API OpenRouter)");
      setScript(text);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la génération. Vérifie ta connexion et réessaie.");
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
    <div>
      <style>{`
        .generator-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 820px) {
          .generator-container {
            grid-template-columns: 1fr;
          }
          .tone-grid {
             justify-content: center;
          }
        }
      `}</style>
      <div className="generator-container">
        {/* LEFT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Upload */}
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Image Source</span>
            <input
              id="img-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = ""; }}
            />

            {!image ? (
              <div className="glass-panel" style={{ border: "none", borderRadius: 16, padding: "32px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Sélectionne une image à analyser</div>
                <label htmlFor="img-upload" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 28px", borderRadius: 12, background: "#C8FF57", color: "#0D0D0F", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "opacity 0.15s" }}>
                  📁 Choisir une image
                </label>
                <div style={{ fontSize: 11, color: "#444", marginTop: 12 }}>PNG, JPG, WEBP acceptés</div>
              </div>
            ) : (
              <div className="glass-panel" style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "none" }}>
                <img src={image} alt="preview" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                <button onClick={reset} style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.75)", border: "none", color: "#fff", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✕ Supprimer</button>
                <label htmlFor="img-upload" style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(200,255,87,0.92)", color: "#0D0D0F", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                  📁 Remplacer
                </label>
              </div>
            )}
          </div>

          {/* Platform selection */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Plateforme</label>
            <div style={{ display: "flex", gap: 8 }}>
              {PLATFORMS.map((p) => (
                <button key={p.id} className="pill-btn" onClick={() => setPlatform(p.id)}
                  style={{ flex: 1, padding: "10px 8px", borderRadius: 12, background: platform === p.id ? "#1A1A22" : "#0F0F13", border: `2px solid ${platform === p.id ? p.color : "#222"}`, color: platform === p.id ? "#F0EDE8" : "#555", fontSize: 11, fontWeight: 600 }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{p.icon}</div>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Durée</label>
            <div style={{ display: "flex", gap: 8 }}>
              {DURATIONS.map((d) => (
                <button key={d.id} className="pill-btn" onClick={() => setDuration(d.id)}
                  style={{ flex: 1, padding: "10px 6px", borderRadius: 10, background: duration === d.id ? "#C8FF57" : "#111115", border: `1.5px solid ${duration === d.id ? "#C8FF57" : "#222"}`, color: duration === d.id ? "#0D0D0F" : "#666", fontSize: 13, fontWeight: duration === d.id ? 700 : 400 }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Ton</label>
            <div className="tone-grid" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TONES.map((t) => (
                <button key={t.id} className="pill-btn" onClick={() => setTone(t.id)}
                  style={{ padding: "8px 16px", borderRadius: 20, background: tone === t.id ? "#1E1E2A" : "transparent", border: `1.5px solid ${tone === t.id ? "#7B6EF6" : "#222"}`, color: tone === t.id ? "#A89CF7" : "#555", fontSize: 12, fontWeight: 500 }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button className="gen-btn" disabled={!image || loading} onClick={generateScript}
            style={{ padding: "16px", borderRadius: 14, background: image && !loading ? "#C8FF57" : "#1A1A22", border: "none", color: image && !loading ? "#0D0D0F" : "#333", fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.3px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? (
              <>
                <span className="loading-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8FF57", display: "inline-block" }} />
                <span className="loading-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8FF57", display: "inline-block" }} />
                <span className="loading-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8FF57", display: "inline-block" }} />
                <span style={{ marginLeft: 4 }}>Génération en cours…</span>
              </>
            ) : (
              <>✨ Générer le Script</>
            )}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "1px", textTransform: "uppercase" }}>Script Généré</label>
            {script && (
              <button onClick={copyScript} className="pill-btn"
                style={{ padding: "6px 14px", borderRadius: 20, background: copied ? "#C8FF57" : "#1A1A22", border: `1px solid ${copied ? "#C8FF57" : "#2A2A35"}`, color: copied ? "#0D0D0F" : "#888", fontSize: 11, fontWeight: 600 }}>
                {copied ? "✓ Copié !" : "⧉ Copier"}
              </button>
            )}
          </div>

          <div className="glass-panel" style={{ flex: 1, border: "none", borderRadius: 16, padding: 20, minHeight: 480, overflow: "auto", position: "relative" }}>
            {!script && !loading && !error && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, opacity: 0.3 }}>
                <div style={{ fontSize: 48 }}>📋</div>
                <div style={{ fontSize: 13, color: "#666", textAlign: "center" }}>Charge une image<br />et génère ton script</div>
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, opacity: 0.7 }}>
                <div style={{ width: 48, height: 48, border: "3px solid #1E1E26", borderTopColor: "#C8FF57", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <div style={{ fontSize: 13, color: "#888" }}>Analyse de l'image en cours…</div>
              </div>
            )}

            {error && (
              <div style={{ padding: 16, background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 12, color: "#FF8080", fontSize: 13 }}>
                ⚠️ {error}
              </div>
            )}

            {script && (
              <div className="slide-up">
                {/* Platform badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 10, width: "fit-content" }}>
                  <span style={{ fontSize: 16 }}>{selectedPlatform?.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#888", letterSpacing: "0.5px" }}>{selectedPlatform?.label.toUpperCase()} • {duration}s</span>
                </div>
                <div className="script-content" style={{ fontSize: 13, color: "#C8C5C0", lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{
                    __html: script
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em style="color:#A89CF7">$1</em>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            )}
          </div>

          {script && (
            <div className="slide-up" style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="pill-btn" onClick={generateScript}
                style={{ flex: 1, padding: "10px", borderRadius: 10, background: "transparent", border: "1px solid #2A2A35", color: "#888", fontSize: 12, fontWeight: 500 }}>
                🔄 Régénérer
              </button>
              <button className="pill-btn" onClick={copyScript}
                style={{ flex: 2, padding: "10px", borderRadius: 10, background: "#C8FF57", border: "none", color: "#0D0D0F", fontSize: 12, fontWeight: 700 }}>
                {copied ? "✓ Script copié !" : "⧉ Copier le script complet"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;
