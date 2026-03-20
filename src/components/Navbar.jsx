import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Zap, PenTool, MessageSquare, Home, BookOpen, History } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Accueil', icon: <Home size={20} /> },
    { path: '/design', label: 'Design', icon: <LayoutGrid size={20} /> },
    { path: '/motivation', label: 'Motivation', icon: <Zap size={20} /> },
    { path: '/story', label: 'Histoires', icon: <BookOpen size={20} /> },
    { path: '/copy', label: 'Copy', icon: <PenTool size={20} /> },
    { path: '/history', label: 'Historique', icon: <History size={20} /> },
  ];

  return (
    <>
      <style>{`
        .floating-nav {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 680px;
          height: 72px;
          background: rgba(18, 18, 24, 0.6);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 8px;
          z-index: 1000;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .nav-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          flex: 1;
          height: 56px;
          border-radius: 16px;
          color: #888;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          overflow: hidden;
        }

        .nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          color: #C8FF57;
          background: rgba(200, 255, 87, 0.05);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: 8px;
          width: 4px;
          height: 4px;
          background: #C8FF57;
          border-radius: 50%;
          box-shadow: 0 0 10px #C8FF57;
        }

        .nav-label {
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: 'Outfit', sans-serif;
        }

        .icon-wrapper {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-item:hover .icon-wrapper {
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .nav-label {
            display: none;
          }
          .floating-nav {
            height: 64px;
            bottom: 16px;
          }
        }
      `}</style>
      
      <nav className="floating-nav">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon-wrapper">
                {link.icon}
              </div>
              <span className="nav-label">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;