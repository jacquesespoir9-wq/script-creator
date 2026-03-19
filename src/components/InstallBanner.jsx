import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée ou en mode standalone
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e) => {
      // Empêcher le navigateur d'afficher sa propre bannière par défaut
      e.preventDefault();
      // Stocker l'événement pour l'utiliser plus tard
      setDeferredPrompt(e);
      
      // Vérifier si l'utilisateur a déjà refusé l'installation récemment
      const lastDismissed = localStorage.getItem('pwa-dismissed');
      const now = Date.now();
      
      // Afficher après 5 secondes si non refusé dans les dernières 24h
      if (!lastDismissed || (now - parseInt(lastDismissed)) > 24 * 60 * 60 * 1000) {
        setTimeout(() => setIsVisible(true), 5000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // Détecter si l'installation a réussi
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      setIsInstalled(true);
      console.log('PWA installée avec succès');
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Afficher l'invite native du navigateur
    deferredPrompt.prompt();
    
    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const dismissBanner = () => {
    setIsVisible(false);
    // Ne plus afficher pendant 24h
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  };

  if (!isVisible || isInstalled || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-8 left-4 right-4 z-[9999] flex justify-center pointer-events-none">
      <div className="glass-panel w-full max-w-md rounded-[28px] p-4 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto slide-up">
        <div className="w-14 h-14 rounded-2xl bg-[#C8FF57] flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_rgba(200,255,87,0.4)]">
          <Smartphone size={28} color="#0D0D0F" strokeWidth={2.5} />
        </div>
        
        <div className="flex-grow">
          <h4 className="text-[15px] font-extrabold font-outfit text-white leading-tight">Installer ScriptGen</h4>
          <p className="text-[11px] text-gray-400 font-medium leading-tight mt-1">
            Ajoutez l'app à votre écran d'accueil pour une expérience fluide.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleInstallClick}
            className="bg-[#C8FF57] text-[#0D0D0F] text-[11px] font-black px-5 py-2.5 rounded-xl hover:scale-105 transition-all active:scale-95 shadow-lg"
          >
            INSTALLER
          </button>
          
          <button 
            onClick={dismissBanner}
            className="p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;