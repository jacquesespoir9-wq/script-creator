import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Target, Cpu, Crown } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#C8FF57]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#7B6EF6]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Crown size={14} className="text-[#C8FF57]" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">L'Excellence par Jacques Design</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-outfit text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-10"
          >
            L'ART DE LA <br />
            <span className="text-[#C8FF57] drop-shadow-[0_0_40px_rgba(200,255,87,0.4)]">VIRALITÉ</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed"
          >
            ScriptGen n'est pas un simple outil. C'est une intelligence supérieure conçue pour transformer chaque pixel de votre design en un levier de croissance exponentielle.
          </motion.p>
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[40px] border border-white/5"
          >
            <div className="w-14 h-14 bg-[#C8FF57]/10 rounded-2xl flex items-center justify-center mb-8 text-[#C8FF57]">
              <Cpu size={28} />
            </div>
            <h3 className="text-2xl font-bold font-outfit mb-4">Intelligence Cognitive</h3>
            <p className="text-gray-500 leading-relaxed">
              Nos algorithmes analysent la structure visuelle de vos créations pour en extraire l'essence narrative la plus percutante.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 rounded-[40px] border border-white/5 bg-white/[0.02]"
          >
            <div className="w-14 h-14 bg-[#7B6EF6]/10 rounded-2xl flex items-center justify-center mb-8 text-[#7B6EF6]">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold font-outfit mb-4">Précision Algorithmique</h3>
            <p className="text-gray-500 leading-relaxed">
              Chaque mot est pesé, chaque phrase est sculptée pour résonner avec les mécanismes de rétention des plateformes sociales.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 rounded-[40px] border border-white/5"
          >
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold font-outfit mb-4">Standard Premium</h3>
            <p className="text-gray-500 leading-relaxed">
              Une qualité de rédaction digne des plus grandes agences de copywriting, accessible instantanément.
            </p>
          </motion.div>
        </div>

        {/* Narrative Section */}
        <div className="relative rounded-[60px] overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-12 md:p-24">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles size={200} className="text-[#C8FF57]" />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <h2 className="font-outfit text-4xl md:text-6xl font-black mb-8 leading-tight">
              Redéfinissez les limites de votre <span className="text-[#C8FF57]">influence</span>.
            </h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed">
              Dans un monde saturé de contenu, la différence ne se fait plus sur l'image seule, mais sur l'histoire qu'elle raconte. ScriptGen fusionne le design et le verbe pour créer un impact indélébile.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 text-[#C8FF57] font-bold tracking-widest text-xs uppercase">
                <Zap size={16} /> Performance Maximale
              </div>
              <div className="flex items-center gap-3 text-white/40 font-bold tracking-widest text-xs uppercase">
                <Zap size={16} /> Design-First Approach
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-10px);
          border-color: rgba(200, 255, 87, 0.2);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;