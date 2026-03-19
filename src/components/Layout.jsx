import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, PenLine, Home } from 'lucide-react';
import { PLATFORMS } from '../constants';
import InstallBanner from './InstallBanner';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#F0EDE8] overflow-hidden">
      {/* Animated Blobs */}
      <div className="blob top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[rgba(123,110,246,0.35)]"></div>
      <div className="blob bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[rgba(200,255,87,0.2)] [animation-delay:-5s]"></div>
      <div className="blob top-[40%] left-[40%] w-[450px] h-[450px] bg-[rgba(225,48,108,0.25)] [animation-delay:-10s]"></div>

      {/* Header */}
      <header className="sticky top-0 z-[100] w-full px-2 sm:px-4 py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-[2rem] px-4 sm:px-6 py-3 flex items-center justify-between border-none">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 bg-[#C8FF57] rounded-2xl flex items-center justify-center text-[#0D0D0F] shadow-[0_0_20px_rgba(200,255,87,0.3)] group-hover:scale-105 transition-transform">
              <PenLine size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-['Outfit'] text-xl font-extrabold tracking-tight leading-none">ScriptGen</span>
              <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold">AI Studio</span>
            </div>
          </div>

          {/* Navigation Links - Scrollable on mobile */}
          <nav className="flex items-center gap-1 bg-[#0D0D0F]/40 p-1 rounded-2xl border border-white/5 mx-4 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => navigate('/')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${location.pathname === '/' ? 'bg-[#C8FF57] text-[#0D0D0F]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Home size={16} /> Accueil
            </button>
            {PLATFORMS.map(p => (
              <button 
                key={p.id}
                onClick={() => navigate(`/${p.id}`)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${location.pathname === `/${p.id}` ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <span className="text-lg">{p.icon}</span> {p.label.split(' ')[0]}
              </button>
            ))}
          </nav>

          {/* Status Indicator */}
          <div className="shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 text-[11px] font-black text-[#C8FF57] bg-[#C8FF57]/10 border border-[#C8FF57]/20 rounded-xl uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8FF57] animate-pulse"></div>
              <span className="hidden xs:inline">IA Active</span>
              <Sparkles size={14} className="xs:hidden" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {children}
      </main>
      
      <InstallBanner />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          nav {
            max-width: 50vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;