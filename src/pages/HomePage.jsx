import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Effets de fond "Liquid" */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#C8FF57]/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7B6EF6]/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Badge flottant */}
        <div className="ios-glass-badge mb-10 slide-up">
          <Sparkles size={14} className="text-[#C8FF57]" />
          <span>L'intelligence artificielle réinventée</span>
        </div>

        {/* Titre principal centré */}
        <h1 className="font-outfit text-5xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tighter slide-up" style={{ animationDelay: '0.1s' }}>
          Créez du contenu <br />
          <span className="liquid-text">Viral en secondes</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-16 font-medium leading-relaxed slide-up" style={{ animationDelay: '0.2s' }}>
          L'outil ultime pour les créateurs. Choisissez votre spécialité et laissez la magie opérer.
        </p>

        {/* Grille de catégories Liquid Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full slide-up" style={{ animationDelay: '0.3s' }}>
          {PLATFORMS.map((platform) => (
            <Link 
              key={platform.id} 
              to={platform.id === 'design' ? '/design' : platform.id === 'motivation' ? '/motivation' : platform.id === 'copy' ? '/copy' : '/desc'}
              className="ios-glass-card group"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                style={{ background: `${platform.color}20`, color: platform.color, border: `1px solid ${platform.color}30` }}
              >
                <PlatformIcon id={platform.id} size={28} />
              </div>
              
              <h3 className="text-xl font-bold font-outfit mb-2 group-hover:text-white transition-colors">
                {platform.label}
              </h3>
              
              <div className="mt-auto flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#C8FF57] transition-all">
                Explorer <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .ios-glass-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .liquid-text {
          background: linear-gradient(to bottom, #fff 30%, #C8FF57 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(200, 255, 87, 0.3));
        }

        .ios-glass-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: hidden;
        }

        .ios-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .ios-glass-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05);
        }

        .ios-glass-card:hover::before {
          opacity: 1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;