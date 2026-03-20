import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Zap, PenTool, MessageSquare, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Design', icon: <LayoutGrid size={18} /> },
    { path: '/motivation', label: 'Motivation', icon: <Zap size={18} /> },
    { path: '/copywriter', label: 'Copywriter', icon: <PenTool size={18} /> },
    { path: '/description', label: 'Description', icon: <MessageSquare size={18} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
      <div className={`max-w-6xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between transition-all ${isScrolled ? 'bg-black/60 border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}`}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#C8FF57] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap size={18} color="#0D0D0F" fill="#0D0D0F" />
          </div>
          <span className="font-outfit font-extrabold text-xl tracking-tight">
            Script<span className="text-[#C8FF57]">Gen</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                location.pathname === link.path 
                ? 'bg-[#C8FF57] text-[#0D0D0F]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-6 right-6 glass-panel rounded-3xl p-4 flex flex-col gap-2 slide-up">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                location.pathname === link.path 
                ? 'bg-[#C8FF57] text-[#0D0D0F]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;