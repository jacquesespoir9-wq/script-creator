import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles, User, LogOut, Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-[100] w-full px-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F9825A] to-[#2E3192] shadow-[0_0_20px_rgba(249,130,90,0.4)] transition-transform group-hover:scale-110">
            <Zap size={20} className="text-white fill-white" />
            <div className="absolute inset-0 rounded-xl bg-[#F9825A] opacity-0 blur-lg transition-opacity group-hover:opacity-40" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            SCRIPT<span className="text-[#F9825A]">GEN</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/instagram">Instagram</NavLink>
          <NavLink href="/tiktok">TikTok</NavLink>
          <NavLink href="/youtube">YouTube</NavLink>
          <NavLink href="/facebook">Facebook</NavLink>
        </nav>

        {/* User Zone / CTA */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-[#F9825A]/30 bg-[#F9825A]/10 px-3 py-1 text-[10px] font-bold text-[#F9825A] uppercase tracking-widest sm:flex">
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
              className="hidden rounded-xl bg-[#F9825A] px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(249,130,90,0.3)] md:block"
            >
              Commencer
            </motion.button>
          )}

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.header>
  );
};

export default Navbar;