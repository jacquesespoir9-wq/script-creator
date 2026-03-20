import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';

const DescriptionPage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Légendes & <span className="text-gray-400">Descriptions</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6 font-medium">
          Optimisez vos publications avec des descriptions engageantes et des hashtags pertinents.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="desc" />
    </div>
  );
};

export default DescriptionPage;