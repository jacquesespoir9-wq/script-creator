import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Zap, PenTool, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Design', icon: <LayoutGrid size={20} /> },
    { path: '/motivation', label: 'Motivation', icon: <Zap size={20} /> },
    { path: '/copywriter', label: 'Copywriter', icon: <PenTool size={20} /> },
    { path: '/description', label: 'Description', icon: <MessageSquare size={20} /> },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-lg">
      <div className="glass-panel rounded-3xl px-4 py-3 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-[#C8FF57]' : 'text-gray-500 hover:text-white'
              }`}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#C8FF57]/20 blur-xl rounded-full" />
              )}
              
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {link.icon}
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-wider transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {link.label}
              </span>

              {/* Active Dot */}
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-[#C8FF57] rounded-full shadow-[0_0_10px_#C8FF57]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;