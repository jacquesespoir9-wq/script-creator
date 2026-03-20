import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Zap, PenTool, MessageSquare, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Accueil', icon: <Home size={20} /> },
    { path: '/design', label: 'Design', icon: <LayoutGrid size={20} /> },
    { path: '/motivation', label: 'Motivation', icon: <Zap size={20} /> },
    { path: '/copy', label: 'Copywriting', icon: <PenTool size={20} /> },
    { path: '/desc', label: 'Description', icon: <MessageSquare size={20} /> },
  ];

  return (
    <>
      <style>{`
        .bottom-nav-mobile {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 72px;
          background: rgba(18, 18, 24, 0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 10px;
          z-index: 1000;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.4);
        }
        .nav-item-mobile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          flex: 1;
          height: 100%;
          color: #666;
          transition: all 0.2s ease;
        }
        .nav-item-mobile.active {
          color: #C8FF57;
        }
        .label-mobile {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        @media (min-width: 769px) {
          .bottom-nav-mobile {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            width: auto;
            min-width: 500px;
            background: rgba(18, 18, 24, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            height: 64px;
            padding: 0 12px;
          }
           .nav-item-mobile {
             flex: none;
             padding: 0 16px;
             flex-direction: row;
             gap: 8px;
           }
        }
      `}</style>
      
      <div className="bottom-nav-mobile">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item-mobile ${isActive ? 'active' : ''}`}
            >
              <div className={isActive ? 'scale-110' : ''}>
                {link.icon}
              </div>
              <span className="label-mobile">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;