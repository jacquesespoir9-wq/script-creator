import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px", textAlign: 'center' }}>
      <style>{`
        .home-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }
        .platform-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .platform-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(200, 255, 87, 0.3) !important;
        }
        @media (max-width: 600px) {
          .home-title { font-size: 28px !important; }
          .home-desc { font-size: 14px !important; margin-bottom: 32px !important; }
        }
      `}</style>

      <div className="slide-up">
        <h1 className="home-title" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 48, marginBottom: 16, fontWeight: 800 }}>
          Créez des <span style={{ color: "#C8FF57" }}>Scripts</span> Viraux
        </h1>
        <p className="home-desc" style={{ color: "#888", marginBottom: 56, fontSize: 18, maxWidth: 600, margin: "0 auto 56px" }}>
          L'IA analyse vos visuels de design pour générer le script parfait adapté à chaque plateforme.
        </p>

        <div className="home-grid">
          {PLATFORMS.map((p) => (
            <div 
              key={p.id}
              onClick={() => navigate(`/${p.id}`)}
              className="platform-card glass-panel"
              style={{ 
                borderRadius: 28, 
                padding: "40px 24px",
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16
              }}
            >
              <div style={{ 
                background: "rgba(255,255,255,0.03)", 
                width: 80, 
                height: 80, 
                borderRadius: 20, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 8,
                color: p.color
              }}>
                <PlatformIcon id={p.id} size={40} color={p.id === 'tiktok' ? '#fff' : p.color} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{p.label}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>Contenu optimisé pour {p.label}</div>
              <div style={{ 
                marginTop: 12,
                padding: "10px 24px",
                borderRadius: 14,
                background: p.color,
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                boxShadow: `0 10px 20px ${p.color}33`
              }}>
                Sélectionner
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;