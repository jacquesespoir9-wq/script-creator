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
      className="fixed top-6 left-0 right-0 z-[100] w-full px-4 flex justify-center"
    >
      {/* Liquid Glass Container */}
      <div className="relative flex w-full max-w-7xl items-center justify-between px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Left: App Name & Logo */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#F9825A] to-[#2E3192] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0D0D0F]">
              <Zap size={16} className="text-[#F9825A] fill-[#F9825A]" />
            </div>
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

        {/* Right: Three Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* 1. Credits Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all">
            <Sparkles size={14} className="text-[#C8FF57]" />
            <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">120 Crédits</span>
          </button>

          {/* 2. Profile Button */}
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all">
            <User size={18} />
          </button>

          {/* 3. Primary CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2 rounded-full bg-[#F9825A] text-white text-[12px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(249,130,90,0.3)]"
          >
            Commencer
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 border border-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full left-0 right-0 mt-4 p-6 rounded-[2rem] border border-white/10 bg-[#0D0D0F]/90 backdrop-blur-2xl md:hidden flex flex-col gap-4 shadow-2xl"
            >
              <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 text-white font-bold">
                <span>Crédits</span>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#C8FF57]" />
                  <span>120</span>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 text-white font-bold">
                <User size={18} /> Profil
              </button>
              <button className="w-full py-4 rounded-xl bg-[#F9825A] text-white font-black uppercase tracking-widest">
                Commencer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;