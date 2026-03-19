import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import { Instagram, Music2, Youtube, Facebook } from 'lucide-react';

const IconMap = {
  Instagram,
  Music2,
  Youtube,
  Facebook
};

const PlatformPage = () => {
  const { platformId } = useParams();
  const platformInfo = PLATFORMS.find(p => p.id === platformId);

  if (!platformInfo) return <Navigate to="/" />;

  const Icon = IconMap[platformInfo.iconName];

  return (
    <div className="slide-up" style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
      <BackButton />
      
      <div style={{ textAlign: 'center', marginBottom: 56, marginTop: 40 }}>
        <h1 style={{ 
          fontFamily: "'Outfit', sans-serif", 
          fontSize: "clamp(32px, 8vw, 48px)", 
          marginBottom: 16, 
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16
        }}>
          Mode <span style={{ color: platformInfo.color }}>{platformInfo.label.split(' ')[0]}</span>
          <div style={{ 
            background: `${platformInfo.color}15`, 
            width: 60, 
            height: 60, 
            borderRadius: 18, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: platformInfo.color
          }}>
            <Icon size={32} strokeWidth={2} />
          </div>
        </h1>
        <p style={{ color: "#888", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
          Générez un script viral optimisé spécifiquement pour les algorithmes de {platformInfo.label}.
        </p>
      </div>

      <ScriptGenerator initialPlatformId={platformId} />
    </div>
  );
};

export default PlatformPage;