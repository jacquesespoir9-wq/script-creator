import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, Home, Sparkles, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] max-w-fit">
      <div className="glass-panel rounded-full px-2 py-2 flex items-center gap-1 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Logo / Home Link */}
        <Link 
          to="/" 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
            isActive('/') 
              ? 'bg-[#C8FF57] text-[#0D0D0F]' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Home size={18} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-sm font-bold font-outfit">Accueil</span>
        </Link>

        {/* History Link */}
        <Link 
          to="/history" 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
            isActive('/history') 
              ? 'bg-[#C8FF57] text-[#0D0D0F]' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <History size={18} strokeWidth={isActive('/history') ? 2.5 : 2} />
          <span className="text-sm font-bold font-outfit">Historique</span>
        </Link>

        {/* Separator */}
        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

        {/* Pro Badge / Brand */}
        <div className="flex items-center gap-2 px-4 py-2.5">
          <div className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center">
            <Sparkles size={14} className="text-[#C8FF57]" />
          </div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden sm:block">
            PRO MODE
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;