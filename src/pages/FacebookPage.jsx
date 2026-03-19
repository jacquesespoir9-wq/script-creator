import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';

const FacebookPage = () => {
  return (
    <div className="slide-up" style={{ position: 'relative' }}>
      <BackButton />
      <div style={{ padding: "40px 0 0 0", textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 8 }}>
          Mode <span style={{ color: "#1877F2" }}>Facebook Reels</span> 👥
        </h1>
        <p style={{ color: "#888", marginBottom: 32 }}>Optimisez vos vidéos pour l'audience Facebook.</p>
      </div>
      <ScriptGenerator initialPlatformId="facebook" />
    </div>
  );
};

export default FacebookPage;