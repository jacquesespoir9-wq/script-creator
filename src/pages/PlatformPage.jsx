import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ScriptGenerator from '../components/ScriptGenerator';
import BackButton from '../components/BackButton';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const PlatformPage = () => {
  const { platformId } = useParams();
  const platformInfo = PLATFORMS.find(p => p.id === platformId);

  if (!platformInfo) return <Navigate to="/" />;

  return (
    <div className="slide-up" style={{ position: 'relative', minHeight: '100vh' }}>
      <BackButton />
      
      {/* Dynamic Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${platformInfo.color} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 0
        }}
      ></div>

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        padding: "60px 0 40px 0", 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 24, 
          background: 'rgba(255,255,255,0.03)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: 24,
          color: platformInfo.color,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 20px 40px ${platformInfo.color}22`
        }}>
          <PlatformIcon id={platformInfo.id} size={40} color={platformInfo.id === 'tiktok' ? '#fff' : platformInfo.color} />
        </div>
        
        <h1 style={{ 
          fontFamily: "'Outfit', sans-serif", 
          fontSize: 'clamp(28px, 5vw, 42px)', 
          marginBottom: 12, 
          fontWeight: 800,
          letterSpacing: '-0.5px'
        }}>
          Mode <span style={{ color: platformInfo.color }}>{platformInfo.label}</span>
        </h1>
        
        <p style={{ 
          color: "#888", 
          marginBottom: 48, 
          fontSize: 16, 
          fontWeight: 500,
          maxWidth: 500 
        }}>
          Générez un contenu viral optimisé pour l'algorithme de {platformInfo.label}.
        </p>
      </div>

      <ScriptGenerator initialPlatformId={platformId} />
    </div>
  );
};

export default PlatformPage;