import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('Prompt d\'installation prêt');
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    // Apparition après 6 secondes
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    // Disparition après 10 secondes de visibilité (total 16s)
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
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
      setIsVisible(false);
    } else {
      // Fallback si le prompt n'est pas dispo (ex: iOS ou déjà installé)
      alert("Pour installer l'application : \n- Sur iOS : Partager > Sur l'écran d'accueil\n- Sur Android/Chrome : Menu > Installer l'application");
      setIsVisible(false);
    }
  };

  // On affiche la notification si le timer est actif (isVisible)
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-48px)] max-w-md slide-up">
      <div className="glass-panel rounded-3xl p-5 flex items-center gap-4 shadow-2xl border border-white/10">
        <div className="w-12 h-12 rounded-2xl bg-[#C8FF57] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(200,255,87,0.3)]">
          <Download size={24} color="#0D0D0F" strokeWidth={2.5} />
        </div>
        
        <div className="flex-grow">
          <h4 className="text-sm font-bold font-outfit text-white">Installer ScriptGen</h4>
          <p className="text-[11px] text-gray-400 font-medium leading-tight mt-0.5">
            Accédez à vos scripts plus rapidement en installant l'application.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={handleInstallClick}
            className="bg-[#C8FF57] text-[#0D0D0F] text-[11px] font-extrabold px-4 py-2 rounded-xl hover:scale-105 transition-transform active:scale-95"
          >
            INSTALLER
          </button>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-7 h-7 bg-[#1A1A22] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;