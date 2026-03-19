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

  // Redirection vers l'accueil si la plateforme n'existe pas
  if (!platformInfo) return <Navigate to="/" />;

  const Icon = IconMap[platformInfo.iconName];

  return (
    <div className="slide-up" style={{ position: 'relative' }}>
      <BackButton />
      <div style={{ padding: "40px 0 0 0", textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          Mode <span style={{ color: platformInfo.color }}>{platformInfo.label}</span> <Icon size={32} />
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