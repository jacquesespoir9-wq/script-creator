import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const PlatformPage = () => {
  const { platformId } = useParams();
  const platformInfo = PLATFORMS.find(p => p.id === platformId);

  // Redirection vers l'accueil si la plateforme n'existe pas
  if (!platformInfo) return <Navigate to="/" />;

  return (
    <div className="slide-up" style={{ position: 'relative' }}>
      <BackButton />
      <div style={{ padding: "40px 0 0 0", textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          width: 64, 
          height: 64, 
          borderRadius: 16, 
          background: 'rgba(255,255,255,0.03)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: 16,
          color: platformInfo.color
        }}>
          <PlatformIcon id={platformInfo.id} size={32} color={platformInfo.id === 'tiktok' ? '#fff' : platformInfo.color} />
        </div>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 8 }}>
          Mode <span style={{ color: platformInfo.color }}>{platformInfo.label}</span>
        </h1>
        <p style={{ color: "#888", marginBottom: 32 }}>
          Gérez vos contenus pour {platformInfo.label} avec un script optimisé.
        </p>
      </div>
      <ScriptGenerator initialPlatformId={platformId} />
    </div>
  );
};

export default PlatformPage;