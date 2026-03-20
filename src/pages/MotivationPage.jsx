import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import { Zap } from 'lucide-react';

const MotivationPage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#C8FF57]/10 rounded-2xl flex items-center justify-center mb-6 text-[#C8FF57] border border-[#C8FF57]/20">
          <Zap size={32} fill="#C8FF57" />
        </div>
        <h1 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4">
          Scripts de <span className="text-[#C8FF57]">Motivation</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6">
          Générez des discours inspirants et percutants pour booster votre audience.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="instagram" category="motivation" />
    </div>
  );
};

export default MotivationPage;