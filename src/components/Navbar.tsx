import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 sm:top-6 left-0 right-0 z-[100] w-full px-4 flex justify-center"
    >
      {/* Liquid Glass Container - Responsive Width */}
      <div className="relative flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Left: App Name & Logo */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#F9825A] to-[#2E3192] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0D0D0F]">
              <Zap size={14} className="text-[#F9825A] fill-[#F9825A] sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
              Script<span className="text-[#F9825A]">Gen</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-0.5">
              AI Studio
            </span>
          </div>
        </div>

        {/* Right: Action Buttons Group */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* 1. Credits Button - Compact on Mobile */}
          <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all">
            <Sparkles size={12} className="text-[#C8FF57] sm:w-3.5 sm:h-3.5" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              120 <span className="hidden xs:inline">Crédits</span>
            </span>
          </button>

          {/* 2. Profile Button - Always Icon */}
          <button className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all">
            <User size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* 3. Primary CTA Button - Hidden on small mobile, shown on tablet/desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#F9825A] text-white text-[11px] sm:text-[12px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(249,130,90,0.3)]"
          >
            Commencer
          </motion.button>

          {/* Mobile Menu Toggle - Only on small screens */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/5 text-white/70 border border-white/10"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown - Liquid Extension */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full left-0 right-0 mt-3 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0D0D0F]/95 backdrop-blur-3xl md:hidden flex flex-col gap-3 shadow-2xl"
            >
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1 px-2">Menu Rapide</div>
              <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 text-white text-sm font-bold">
                <span>Mes Crédits</span>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#C8FF57]" />
                  <span>120</span>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 text-white text-sm font-bold">
                <User size={18} /> Mon Profil
              </button>
              <button className="w-full py-3.5 mt-2 rounded-xl bg-[#F9825A] text-white text-xs font-black uppercase tracking-widest shadow-lg">
                Commencer l'expérience
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;