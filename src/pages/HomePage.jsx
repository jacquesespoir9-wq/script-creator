import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", textAlign: 'center' }}>
      <style>{`
        .platform-card {
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          position: relative;
          overflow: hidden;
        }
        .platform-card:hover {
          transform: translateY(-12px) scale(1.02);
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4) !important;
        }
        .platform-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--glow-color) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .platform-card:hover::before {
          opacity: 0.15;
        }
        .ai-badge {
          background: rgba(200, 255, 87, 0.1);
          color: #C8FF57;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(200, 255, 87, 0.2);
          margin-bottom: 24px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="slide-up">
        <div className="ai-badge">
          <Sparkles size={14} /> Powered by Gemini 2.0 Flash
        </div>
        
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 8vw, 64px)', marginBottom: 20, fontWeight: 800, lineHeight: 1.1 }}>
          L'Intelligence Artificielle au <br />
          service de votre <span style={{ color: "#C8FF57" }}>Design</span>
        </h1>
        
        <p style={{ color: "#888", marginBottom: 64, fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: 700, margin: "0 auto 64px", lineHeight: 1.6 }}>
          Transformez vos créations visuelles en scripts narratifs puissants. 
          Optimisé pour la viralité sur toutes les plateformes sociales.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {PLATFORMS.map((p) => (
            <div 
              key={p.id}
              onClick={() => navigate(`/${p.id}`)}
              className="platform-card glass-panel shimmer-effect"
              style={{ 
                borderRadius: 32, 
                padding: "48px 32px",
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                '--glow-color': p.color
              }}
            >
              <div style={{ 
                background: "rgba(255,255,255,0.03)", 
                width: 84, 
                height: 84, 
                borderRadius: 24, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: p.color,
                boxShadow: `0 20px 40px ${p.color}15`
              }}>
                <PlatformIcon id={p.id} size={42} color={p.id === 'tiktok' ? '#fff' : p.color} />
              </div>
              
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>Algorithme optimisé</div>
              </div>

              <div style={{ 
                marginTop: 12,
                padding: "12px 32px",
                borderRadius: 16,
                background: p.color,
                color: "#fff",
                fontSize: 14,
                fontWeight: 800,
                boxShadow: `0 10px 25px ${p.color}44`,
                width: '100%'
              }}>
                Commencer
              </div>
            </div>
          ))}
        </div>

        {/* Premium Features Bar */}
        <div style={{ 
          marginTop: 80, 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '40px',
          padding: '32px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#555', fontSize: 14, fontWeight: 600 }}>
            <Zap size={18} color="#C8FF57" /> Génération Instantanée
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#555', fontSize: 14, fontWeight: 600 }}>
            <ShieldCheck size={18} color="#C8FF57" /> Analyse de Design Précise
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#555', fontSize: 14, fontWeight: 600 }}>
            <Sparkles size={18} color="#C8FF57" /> Contenu Prêt à Publier
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;