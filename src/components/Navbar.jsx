import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, Home, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-4xl">
      <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#C8FF57] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(200,255,87,0.3)]">
            <Sparkles size={18} color="#0D0D0F" strokeWidth={2.5} />
          </div>
          <span className="font-outfit font-extrabold text-lg tracking-tight">
            Script<span className="text-[#C8FF57]">Gen</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 md:gap-4">
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              isActive('/') 
                ? 'bg-white/10 text-[#C8FF57]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home size={16} />
            <span className="hidden md:inline">Accueil</span>
          </Link>
          
          <Link 
            to="/history" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              isActive('/history') 
                ? 'bg-white/10 text-[#C8FF57]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <History size={16} />
            <span className="hidden md:inline">Historique</span>
          </Link>
        </div>

        {/* Pro Badge / Action */}
        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="px-3 py-1 rounded-md bg-[#C8FF57]/10 border border-[#C8FF57]/20 text-[#C8FF57] text-[10px] font-black uppercase tracking-widest">
            PRO
          </div>
          <div className="text-[11px] font-bold text-gray-500 font-outfit">
            BY JACQUES
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;