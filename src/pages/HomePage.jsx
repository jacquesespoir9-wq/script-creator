import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../constants';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px", textAlign: 'center' }}>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 42, marginBottom: 16 }}>
        Choisissez votre <span style={{ color: "#C8FF57" }}>Plateforme</span>
      </h1>
      <p style={{ color: "#888", marginBottom: 48, fontSize: 16 }}>
        Sélectionnez le mode de création pour générer votre script optimisé.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {PLATFORMS.map((p) => (
          <div 
            key={p.id}
            onClick={() => navigate(`/${p.id}`)}
            className="pill-btn glass-panel"
            style={{ 
              border: "none", 
              borderRadius: 24, 
              padding: "40px 24px",
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16
            }}
          >
            <div style={{ fontSize: 48 }}>{p.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{p.label}</div>
            <div style={{ fontSize: 13, color: "#666" }}>Script optimisé pour {p.label}</div>
            <div style={{ 
              marginTop: 12,
              padding: "8px 20px",
              borderRadius: 12,
              background: p.color,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700
            }}>
              Ouvrir le mode
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
