import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, Home, Menu, X } from 'lucide-react';
import { PLATFORMS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItemClasses = (path: string) => `
    relative flex items-center gap-2 px-4 py-2 text-[13px] font-bold transition-all duration-500 rounded-full whitespace-nowrap
    ${location.pathname === path 
      ? 'bg-white/15 text-white shadow-[0_8px_32px_rgba(255,255,255,0.1)]' 
      : 'text-white/50 hover:text-white hover:bg-white/5'}
  `;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-[100] w-full px-4 flex justify-center"
    >
      {/* Main Liquid Container */}
      <div className="relative flex items-center gap-8 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none">
        
        {/* 1. Logo Section */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#F9825A] to-[#2E3192] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0D0D0F]">
              <Zap size={16} className="text-[#F9825A] fill-[#F9825A]" />
            </div>
            <div className="absolute inset-0 rounded-full bg-[#F9825A]/20 blur-md animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white leading-none">
              Script<span className="text-[#F9825A]">Gen</span>
            </span>
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mt-0.5">
              AI Studio
            </span>
          </div>
        </div>

        {/* 2. Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          <button onClick={() => navigate('/')} className={navItemClasses('/')}>
            <Home size={14} /> Accueil
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          {PLATFORMS.map((p) => (
            <button 
              key={p.id} 
              onClick={() => navigate(`/${p.id}`)} 
              className={navItemClasses(`/${p.id}`)}
            >
              <span className="text-base">{p.icon}</span>
              <span className="hidden lg:inline">{p.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>

        {/* 3. Status & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* IA Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF57]/10 border border-[#C8FF57]/20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF57] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF57]"></span>
            </div>
            <span className="text-[10px] font-black text-[#C8FF57] uppercase tracking-widest hidden sm:inline">IA Active</span>
            <Sparkles size={12} className="text-[#C8FF57] sm:hidden" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full left-0 right-0 mt-4 p-4 rounded-[2rem] border border-white/10 bg-[#0D0D0F]/80 backdrop-blur-2xl md:hidden flex flex-col gap-2 shadow-2xl"
            >
              <button onClick={() => { navigate('/'); setIsOpen(false); }} className={navItemClasses('/')}>
                <Home size={16} /> Accueil
              </button>
              {PLATFORMS.map((p) => (
                <button 
                  key={p.id} 
                  onClick={() => { navigate(`/${p.id}`); setIsOpen(false); }} 
                  className={navItemClasses(`/${p.id}`)}
                >
                  <span className="text-xl">{p.icon}</span> {p.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;