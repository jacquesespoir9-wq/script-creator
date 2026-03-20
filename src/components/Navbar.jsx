import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, History, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', icon: <Home size={26} strokeWidth={isActive => isActive ? 2.5 : 2} /> },
    { path: '/design', icon: <Search size={26} strokeWidth={isActive => isActive ? 2.5 : 2} /> },
    { path: '/history', icon: <PlusSquare size={26} strokeWidth={isActive => isActive ? 2.5 : 2} /> },
    { path: '/motivation', icon: <History size={26} strokeWidth={isActive => isActive ? 2.5 : 2} /> },
    { path: '/copy', icon: <User size={26} strokeWidth={isActive => isActive ? 2.5 : 2} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000]">
      <div className="bg-black/80 backdrop-blur-2xl border-t border-white/5 px-6 pb-8 pt-3 flex items-center justify-between max-w-md mx-auto">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-200 ${isActive ? 'text-white scale-110' : 'text-gray-500'}`}
            >
              {React.cloneElement(link.icon, { 
                strokeWidth: isActive ? 2.5 : 2,
                fill: isActive && link.path === '/' ? 'currentColor' : 'none'
              })}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;