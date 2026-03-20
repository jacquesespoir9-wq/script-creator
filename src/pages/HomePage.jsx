import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = () => {
  return (
    <div className="slide-up pt-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#C8FF57] text-xs font-bold tracking-widest uppercase mb-8">
          <Sparkles size={14} /> L'IA au service de votre créativité
        </div>
        <h1 className="font-outfit text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Créez du contenu <br />
          <span className="text-[#C8FF57]">Viral en secondes</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Choisissez votre spécialité et laissez notre IA générer des scripts percutants pour vos réseaux sociaux.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {PLATFORMS.map((platform) => (
          <Link 
            key={platform.id} 
            to={platform.id === 'design' ? '/design' : platform.id === 'motivation' ? '/motivation' : platform.id === 'copy' ? '/copy' : '/desc'}
            className="group relative overflow-hidden rounded-[32px] transition-all duration-500 hover:-translate-y-2"
          >
            <div className="glass-panel p-8 h-full flex flex-col border-white/5 group-hover:border-[#C8FF57]/30 transition-colors">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${platform.color}15`, color: platform.color }}
              >
                <PlatformIcon id={platform.id} size={28} />
              </div>
              
              <h3 className="text-2xl font-bold font-outfit mb-3 group-hover:text-[#C8FF57] transition-colors">
                {platform.label}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {platform.id === 'design' && "Générez des tutoriels de design étape par étape à partir de vos créations."}
                {platform.id === 'motivation' && "Créez des discours inspirants et puissants pour booster votre audience."}
                {platform.id === 'copy' && "Rédigez des textes de vente persuasifs avec la méthode AIDA."}
                {platform.id === 'desc' && "Optimisez vos légendes et hashtags pour un engagement maximal."}
              </p>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C8FF57]">
                Commencer <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            
            {/* Decorative glow */}
            <div 
              className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ background: platform.color }}
            ></div>
          </Link>
        ))}
      </div>

      <div className="glass-panel rounded-[40px] p-10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-outfit mb-4">Prêt à devenir viral ?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Rejoignez des milliers de créateurs qui utilisent ScriptGen pour gagner du temps.
          </p>
          <Link to="/history" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-colors">
            Voir mon historique
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#C8FF57]/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default HomePage;