import React from 'react';
import ScriptGenerator from '../components/ScriptGenerator';
import { MessageSquare } from 'lucide-react';

const DescriptionPage = () => {
  return (
    <div className="slide-up pt-24">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white border border-white/10">
          <MessageSquare size={32} />
        </div>
        <h1 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4">
          Légendes & <span className="text-gray-400">Descriptions</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto px-6">
          Optimisez vos publications avec des descriptions engageantes et des hashtags pertinents.
        </p>
      </div>
      <ScriptGenerator initialPlatformId="instagram" category="description" />
    </div>
  );
};

export default DescriptionPage;