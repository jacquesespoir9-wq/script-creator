import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';

const InstagramPage = () => {
  return (
    <div className="slide-up" style={{ position: 'relative' }}>
      <BackButton />
      <div style={{ padding: "40px 0 0 0", textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 8 }}>
          Mode <span style={{ color: "#E1306C" }}>Instagram Reels</span> 📸
        </h1>
        <p style={{ color: "#888", marginBottom: 32 }}>Gérez vos contenus visuels avec un script captivant.</p>
      </div>
      <ScriptGenerator initialPlatformId="instagram" />
    </div>
  );
};

export default InstagramPage;