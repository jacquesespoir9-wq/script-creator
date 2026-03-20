import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import { LayoutGrid, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="ai-badge mb-6">
          <Sparkles size={14} className="mr-2" /> Powered by Jacques Design
        </div>
        <div className="w-16 h-16 bg-[#C8FF57]/10 rounded-2xl flex items-center justify-center mb-6 text-[#C8FF57] border border-[#C8FF57]/20">
          <LayoutGrid size={32} />
        </div>
        <h1 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4">
          Scripts de <span className="text-[#C8FF57]">Design</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6">
          Transformez vos créations visuelles en tutoriels narratifs puissants et viraux.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="design" />
      
      <style>{`
        .ai-badge {
          background: rgba(200, 255, 87, 0.1);
          color: #C8FF57;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(200, 255, 87, 0.2);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default HomePage;