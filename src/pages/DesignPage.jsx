import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';

const DesignPage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Scripts de <span className="text-[#C8FF57] drop-shadow-[0_0_30px_rgba(200,255,87,0.3)]">Design</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6 font-medium">
          Transformez vos créations visuelles en tutoriels narratifs puissants et viraux.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="design" />
    </div>
  );
};

export default DesignPage;