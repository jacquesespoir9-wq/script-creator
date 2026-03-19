import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';

const YouTubePage = () => {
  return (
    <div className="slide-up" style={{ position: 'relative' }}>
      <BackButton />
      <div style={{ padding: "40px 0 0 0", textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 8 }}>
          Mode <span style={{ color: "#FF0000" }}>YouTube Shorts</span> ▶️
        </h1>
        <p style={{ color: "#888", marginBottom: 32 }}>Gérez vos shorts avec un script direct et percutant.</p>
      </div>
      <ScriptGenerator initialPlatformId="youtube" />
    </div>
  );
};

export default YouTubePage;