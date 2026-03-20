import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, LayoutGrid, PenTool, MessageSquare } from 'lucide-react';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-[#050508]">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C8FF57]/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#7B6EF6]/10 rounded-full blur-[160px] pointer-events-none animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Premium Badge */}
        <div className="premium-badge mb-12 slide-up">
          <div className="badge-glow"></div>
          <Sparkles size={14} className="text-[#C8FF57]" />
          <span className="tracking-[0.2em]">L'ÉLITE DE LA CRÉATION IA</span>
        </div>

        {/* Hero Title with Luxury Gradient */}
        <div className="text-center mb-10 slide-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-outfit text-6xl md:text-9xl font-extrabold leading-[0.95] tracking-tighter mb-8">
            <span className="text-white">L'ART DU</span> <br />
            <span className="premium-gradient-text">CONTENU VIRAL</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Propulsez votre créativité dans une nouvelle dimension. <br className="hidden md:block" />
            Des scripts haute performance, générés par une IA d'exception.
          </p>
        </div>

        {/* Main Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-12 slide-up" style={{ animationDelay: '0.3s' }}>
          {PLATFORMS.map((platform) => (
            <Link 
              key={platform.id} 
              to={platform.id === 'design' ? '/design' : platform.id === 'motivation' ? '/motivation' : platform.id === 'copy' ? '/copy' : '/desc'}
              className="premium-card group"
            >
              <div className="card-border"></div>
              <div className="card-content">
                <div 
                  className="icon-wrapper mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                  style={{ color: platform.color }}
                >
                  <PlatformIcon id={platform.id} size={32} />
                  <div className="icon-glow" style={{ backgroundColor: platform.color }}></div>
                </div>
                
                <h3 className="text-2xl font-bold font-outfit mb-3 text-white/90 group-hover:text-white transition-colors">
                  {platform.label}
                </h3>
                
                <p className="text-gray-500 text-sm font-medium mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  Optimisé pour la viralité {platform.label}.
                </p>
                
                <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#C8FF57] opacity-60 group-hover:opacity-100 transition-all">
                  ACCÉDER <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .premium-badge {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          font-size: 10px;
          font-weight: 900;
          color: #C8FF57;
          overflow: hidden;
        }

        .badge-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(200, 255, 87, 0.2), transparent);
          animation: shimmer 3s infinite;
        }

        .premium-gradient-text {
          background: linear-gradient(to bottom, #C8FF57 0%, #7B6EF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 40px rgba(200, 255, 87, 0.2));
        }

        .premium-card {
          position: relative;
          height: 320px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(40px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: hidden;
        }

        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
        }

        .card-border {
          position: absolute;
          inset: 0;
          border-radius: 40px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: all 0.6s;
        }

        .premium-card:hover {
          transform: translateY(-12px) scale(1.02);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .premium-card:hover .card-border {
          background: linear-gradient(135deg, #C8FF57, transparent, #7B6EF6);
          opacity: 0.5;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-glow {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          filter: blur(25px);
          opacity: 0.2;
          z-index: -1;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;