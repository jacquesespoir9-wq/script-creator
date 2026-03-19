import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, PenLine } from 'lucide-react';
import InstallBanner from './InstallBanner';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#F0EDE8] overflow-hidden">
      {/* Animated Blobs */}
      <div className="blob top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[rgba(123,110,246,0.35)]"></div>
      <div className="blob bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[rgba(200,255,87,0.2)] [animation-delay:-5s]"></div>
      <div className="blob top-[40%] left-[40%] w-[450px] h-[450px] bg-[rgba(225,48,108,0.25)] [animation-delay:-10s]"></div>

      {/* Header */}
      <header className="content-layer glass-panel sticky top-0 z-[100] flex items-center justify-between px-8 py-5 border-none">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 bg-[#C8FF57] rounded-xl flex items-center justify-center text-[#0D0D0F]">
            <PenLine size={20} />
          </div>
          <div>
            <div className="font-['Outfit'] text-lg font-extrabold tracking-tight">ScriptGen</div>
            <div className="text-[11px] text-gray-500 tracking-widest uppercase hidden sm:block">Design Tutorials</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-xs text-gray-400 bg-[#141418] border border-[#222] rounded-full">
          <Sparkles size={14} className="text-[#C8FF57]" />
          IA Powered
        </div>
      </header>

      <main className="content-layer relative min-h-[calc(100vh-80px)]">
        {children}
      </main>
      
      <InstallBanner />
    </div>
  );
};

export default Layout;