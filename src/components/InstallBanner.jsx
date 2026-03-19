import React, { useState, useEffect } from 'react';

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent browser default prompt
      e.preventDefault();
      // Save event so we can trigger it later
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    // Show the banner exactly 6 seconds after opening the app
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    // Hide the banner automatically after being visible for 10 seconds (total 16s)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 16000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show native install prompt
      deferredPrompt.prompt();
      // Wait for user choice
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Never prompt again in this session
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (!deferredPrompt || !isVisible) return null;

  return (
    <div className="slide-up glass-panel" style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      color: '#F0EDE8',
      padding: '16px 20px',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
      width: 'max-content',
      maxWidth: '90vw'
    }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: '15px', fontFamily: "'Outfit', sans-serif" }}>Télécharger ScriptGen</div>
        <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: 500, marginTop: 2 }}>Installez l'app sur votre téléphone.</div>
      </div>
      <button 
        onClick={handleInstallClick}
        style={{
          background: '#C8FF57',
          color: '#0D0D0F',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '14px',
          fontWeight: 800,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
        className="pill-btn"
      >
        <span style={{ fontSize: 16 }}>📥</span> Installer l'App
      </button>
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#F0EDE8',
          opacity: 0.5,
          cursor: 'pointer',
          padding: '8px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default InstallBanner;
