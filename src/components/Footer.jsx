import React from 'react';
import { Heart, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="relative z-10 mt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
            Script<span style={{ color: '#C8FF57' }}>Gen</span>
          </div>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px', maxWidth: '400px' }}>
            L'outil ultime pour transformer vos designs en scripts viraux grâce à l'intelligence artificielle.
          </p>
          
          {/* Le bouton d'historique ne s'affiche que si on n'est PAS sur la page d'accueil */}
          {!isHomePage && (
            <div className="flex gap-4 mb-6">
              <Link to="/history" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-semibold text-gray-300">
                <History size={16} /> Historique des scripts
              </Link>
            </div>
          )}
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', width: '100%', marginBottom: '24px' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              Fait par <span style={{ color: '#C8FF57', fontWeight: 700 }}>Jacques Design</span> <Heart size={14} fill="#E1306C" color="#E1306C" />
            </div>
            <div style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>
              © {new Date().getFullYear()} ScriptGen. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;