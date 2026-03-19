import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';
import { Sparkles } from 'lucide-react';

const PlatformPage = () => {
  const { platformId } = useParams();
  const platformInfo = PLATFORMS.find(p => p.id === platformId);

  if (!platformInfo) return <Navigate to="/" />;

  return (
    <div className="slide-up relative">
      <BackButton />
      
      <div className="pt-12 pb-10 text-center flex flex-col items-center px-6">
        <div className="ai-badge mb-6">
          <Sparkles size={14} /> Mode {platformInfo.label}
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 shadow-2xl border border-white/10" style={{ color: platformInfo.color }}>
          <PlatformIcon id={platformInfo.id} size={40} color={platformInfo.id === 'tiktok' ? '#fff' : platformInfo.color} />
        </div>

        <h1 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4">
          Générateur <span style={{ color: platformInfo.color }}>{platformInfo.label}</span>
        </h1>
        
        <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
          Créez des scripts percutants et optimisés pour maximiser votre impact sur {platformInfo.label}.
        </p>
      </div>

      <ScriptGenerator initialPlatformId={platformId} />
    </div>
  );
};

export default PlatformPage;