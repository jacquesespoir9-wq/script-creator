import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Sparkles, User, LogOut, Menu, X, Home } from 'lucide-react';
import { PLATFORMS } from '../constants';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItemClasses = (path: string) => `
    relative flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl
    ${location.pathname === path 
      ? 'bg-[#F9825A] text-white shadow-[0_0_15px_rgba(249,130,90,0.4)]' 
      : 'text-gray-400 hover:text-white hover:bg-white/5'}
  `;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-[100] w-full px-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl shadow-2xl">
        
        {/* Logo Section */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F9825A] to-[#2E3192] shadow-[0_0_20px_rgba(249,130,90,0.4)] transition-transform group-hover:scale-110">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">
              SCRIPT<span className="text-[#F9825A]">GEN</span>
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-0.5">
              AI Studio
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex bg-black/20 p-1 rounded-2xl border border-white/5">
          <button onClick={() => navigate('/')} className={navItemClasses('/')}>
            <Home size={16} /> Accueil
          </button>
          {PLATFORMS.map((p) => (
            <button 
              key={p.id} 
              onClick={() => navigate(`/${p.id}`)} 
              className={navItemClasses(`/${p.id}`)}
            >
              <span className="text-lg">{p.icon}</span> {p.label.split(' ')[0]}
            </button>
          ))}
        </nav>

        {/* User Zone / Status */}
        <div className="flex items-center gap-3 shrink-0">
          {/* IA Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#C8FF57]/20 bg-[#C8FF57]/5 text-[10px] font-black text-[#C8FF57] uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8FF57] animate-pulse" />
            IA Active
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-xl border border-[#F9825A]/30 bg-[#F9825A]/10 px-3 py-1.5 text-[10px] font-bold text-[#F9825A] uppercase tracking-widest">
                <Sparkles size={12} />
                120 Crédits
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
                <User size={18} />
              </button>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="hidden text-xs font-bold text-gray-500 hover:text-red-400 transition-colors lg:block"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249,130,90,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoggedIn(true)}
              className="hidden sm:block rounded-xl bg-[#F9825A] px-5 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(249,130,90,0.3)]"
            >
              Commencer
            </motion.button>
          )}

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 md:hidden border border-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.header>
  );
};

export default Navbar;