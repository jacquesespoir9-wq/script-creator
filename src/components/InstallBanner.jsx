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
    <>
      <style>{`
        .install-notification {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          color: #F0EDE8;
          padding: 16px 20px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
          width: max-content;
          max-width: 90vw;
        }

        @media (max-width: 600px) {
          .install-notification {
            flex-direction: column;
            text-align: center;
            gap: 16px;
            top: 50%;
            bottom: auto;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100% - 60px);
            max-width: 320px;
            padding: 30px 24px;
            backdrop-filter: blur(40px) !important;
            border: 1px solid rgba(200, 255, 87, 0.3) !important;
          }
          .install-notification .install-btn {
            width: 100%;
            justify-content: center;
            padding: 15px !important;
          }
        }
      `}</style>
      
      <div className="slide-up glass-panel install-notification">
        <div>
          <div style={{ fontWeight: 800, fontSize: '15px', fontFamily: "'Outfit', sans-serif" }}>Télécharger ScriptGen</div>
          <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: 500, marginTop: 2 }}>Installez l'app sur votre téléphone.</div>
        </div>
        <button 
          onClick={handleInstallClick}
          className="pill-btn install-btn"
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
            borderRadius: '8px',
            position: 'absolute',
            top: 4,
            right: 4
          }}
        >
          ✕
        </button>
      </div>
    </>
  );
};

export default InstallBanner;
