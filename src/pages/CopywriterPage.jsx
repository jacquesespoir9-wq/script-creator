import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import { PenTool } from 'lucide-react';

const CopywriterPage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#7B6EF6]/10 rounded-2xl flex items-center justify-center mb-6 text-[#7B6EF6] border border-[#7B6EF6]/20">
          <PenTool size={32} />
        </div>
        <h1 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4">
          Expert <span className="text-[#7B6EF6]">Copywriter</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6">
          Créez des textes de vente qui convertissent et captivent l'attention.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="copy" />
    </div>
  );
};

export default CopywriterPage;