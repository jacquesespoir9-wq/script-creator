import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';

const TikTokPage = () => {
  return (
    <div className="slide-up" style={{ position: 'relative' }}>
      <BackButton />
      <div style={{ padding: "40px 0 0 0", textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 8 }}>
          Mode <span style={{ color: "#69C9D0" }}>TikTok</span> 🎵
        </h1>
        <p style={{ color: "#888", marginBottom: 32 }}>Gérez vos contenus viraux avec un script ultra-dynamique.</p>
      </div>
      <ScriptGenerator initialPlatformId="tiktok" />
    </div>
  );
};

export default TikTokPage;