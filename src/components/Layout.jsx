import React from 'react';
import { useNavigate } from 'react-router-dom';
import InstallBanner from './InstallBanner';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#050508", minHeight: "100vh", color: "#F0EDE8", position: "relative", overflow: "hidden" }}>
      {/* Animated Blobs for iOS 26 Glass Effect */}
      <div className="blob" style={{ top: '-10%', left: '-10%', width: 500, height: 500, background: 'rgba(123, 110, 246, 0.35)' }}></div>
      <div className="blob" style={{ bottom: '-20%', right: '-10%', width: 600, height: 600, background: 'rgba(200, 255, 87, 0.2)', animationDelay: '-5s' }}></div>
      <div className="blob" style={{ top: '40%', left: '40%', width: 450, height: 450, background: 'rgba(225, 48, 108, 0.25)', animationDelay: '-10s' }}></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1f; }
        ::-webkit-scrollbar-thumb { background: #3a3a45; border-radius: 3px; }
        .pill-btn { transition: all 0.18s ease; cursor: pointer; border: none; }
        .pill-btn:hover { transform: translateY(-1px); }
        .upload-zone { transition: all 0.2s ease; }
        .upload-zone:hover { border-color: #C8FF57 !important; background: rgba(200,255,87,0.04) !important; }
        .drag-active { border-color: #C8FF57 !important; background: rgba(200,255,87,0.08) !important; }
        .gen-btn { transition: all 0.2s ease; cursor: pointer; }
        .gen-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,255,87,0.3); }
        .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .loading-dot { animation: pulse 1.2s ease infinite; }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }
        .script-content { white-space: pre-wrap; line-height: 1.8; }
        .script-content strong, .script-content b { color: #C8FF57; }
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 50px) scale(1.1); }
          100% { transform: translate(-30px, -20px) scale(0.9); }
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          animation: float 15s infinite alternate ease-in-out;
          pointer-events: none;
        }
        .glass-panel {
          background: rgba(18, 18, 24, 0.5) !important;
          backdrop-filter: blur(28px) !important;
          -webkit-backdrop-filter: blur(28px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
        }
        .content-layer {
          position: relative;
          z-index: 10;
        }
        /* Mobile adaptation */
        @media (max-width: 768px) {
          .header-nav { padding: 16px 20px !important; }
          .logo-text { font-size: 16px !important; }
          .logo-subtext { display: none; }
          .main-content { padding: 8px !important; }
          .app-badge { padding: 4px 8px !important; font-size: 10px !important; }
        }
      `}</style>
      
      {/* Header */}
      <div className="content-layer glass-panel header-nav" style={{ borderBottom: "none", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div 
          onClick={() => navigate('/')} 
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: 'pointer' }}
        >
          <div style={{ width: 36, height: 36, background: "#C8FF57", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✏️</div>
          <div>
            <div className="logo-text" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>ScriptGen</div>
            <div className="logo-subtext" style={{ fontSize: 11, color: "#666", letterSpacing: "0.5px" }}>DESIGN TUTORIALS</div>
          </div>
        </div>
        <div className="app-badge" style={{ fontSize: 12, color: "#444", background: "#141418", border: "1px solid #222", borderRadius: 20, padding: "4px 12px" }}>
          IA Powered
        </div>
      </div>

      <div className="content-layer main-content" style={{ position: "relative", minHeight: "calc(100vh - 80px)" }}>
        {children}
      </div>
      <InstallBanner />
    </div>
  );
};

export default Layout;
