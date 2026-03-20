import React from 'react';
import StoryGenerator from '../components/StoryGenerator';

const StoryPage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Générateur d'<span className="text-[#FF9F43] drop-shadow-[0_0_30px_rgba(255,159,67,0.3)]">Histoires</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6 font-medium">
          Transformez vos idées les plus folles en récits captivants grâce à la puissance de l'IA.
        </p>
      </div>
      <StoryGenerator />
    </div>
  );
};

export default StoryPage;