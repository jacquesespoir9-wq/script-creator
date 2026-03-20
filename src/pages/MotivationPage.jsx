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
        <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Scripts de <span className="text-[#C8FF57] drop-shadow-[0_0_30px_rgba(200,255,87,0.3)]">Motivation</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6 font-medium">
          Générez des discours inspirants et percutants pour booster votre audience.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="motivation" />
    </div>
  );
};

export default MotivationPage;