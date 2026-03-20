import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Zap, PenTool, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Design', icon: <LayoutGrid size={16} /> },
    { path: '/motivation', label: 'Motivation', icon: <Zap size={16} /> },
    { path: '/copywriter', label: 'Copy', icon: <PenTool size={16} /> },
    { path: '/description', label: 'Desc', icon: <MessageSquare size={16} /> },
  ];

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-6 mb-12">
      <div className="glass-panel rounded-full px-2 py-2 flex items-center justify-center gap-1 border-white/10">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                isActive 
                ? 'bg-[#C8FF57] text-[#0D0D0F] shadow-[0_10px_20px_rgba(200,255,87,0.2)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {link.icon}
              </div>
              
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;