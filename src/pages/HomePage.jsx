import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Cpu, Crown, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-hidden selection:bg-[#C8FF57] selection:text-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#C8FF57]/5 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#7B6EF6]/5 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-white/2 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40"
      >
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-40">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md"
          >
            <Crown size={14} className="text-[#C8FF57]" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-300">L'Excellence par Jacques Design</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-outfit text-7xl md:text-[120px] font-black tracking-tighter leading-[0.85] mb-12"
          >
            L'INGÉNIERIE DU <br />
            <span className="text-[#C8FF57] drop-shadow-[0_0_50px_rgba(200,255,87,0.4)]">VIRAL ABSOLU</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-xl md:text-3xl max-w-4xl font-medium leading-relaxed mb-16"
          >
            ScriptGen fusionne l'intelligence artificielle de pointe et l'art du storytelling pour transformer vos créations en phénomènes mondiaux.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link 
              to="/design" 
              className="group relative inline-flex items-center gap-4 px-10 py-6 bg-[#C8FF57] text-black rounded-full font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">COMMENCER L'EXPÉRIENCE</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { icon: <Cpu size={32} />, title: "Analyse Cognitive", desc: "Nos algorithmes décodent la structure visuelle de vos designs pour en extraire le potentiel narratif maximal." },
            { icon: <Target size={32} />, title: "Précision Algorithmique", desc: "Chaque script est optimisé pour les mécanismes de rétention spécifiques de TikTok, Instagram et YouTube." },
            { icon: <ShieldCheck size={32} />, title: "Standard Premium", desc: "Une qualité de rédaction chirurgicale qui surpasse les standards des meilleures agences de copywriting." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="premium-card p-12 rounded-[48px] border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 text-[#C8FF57] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-bold font-outfit mb-6">{feature.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof / Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20 border-y border-white/5 mb-40"
        >
          {[
            { label: "Scripts Générés", value: "50K+" },
            { label: "Taux de Rétention", value: "85%" },
            { label: "Vues Cumulées", value: "100M+" },
            { label: "Satisfaction", value: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black font-outfit text-[#C8FF57] mb-2">{stat.value}</div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Final CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-[80px] overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 p-12 md:p-32 text-center"
        >
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Zap size={400} className="text-[#C8FF57]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex justify-center gap-2 mb-10">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#C8FF57" className="text-[#C8FF57]" />)}
            </div>
            <h2 className="font-outfit text-5xl md:text-7xl font-black mb-10 leading-tight">
              PRÊT À DÉFINIR LE <br /> <span className="text-[#C8FF57]">NOUVEAU STANDARD ?</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed">
              Rejoignez l'élite des créateurs qui utilisent l'intelligence artificielle pour sculpter l'avenir du contenu digital.
            </p>
            <Link 
              to="/design" 
              className="inline-flex items-center gap-4 px-12 py-7 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-transform"
            >
              ACCÈS IMMÉDIAT
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .premium-card {
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-card:hover {
          transform: translateY(-15px);
          border-color: rgba(200, 255, 87, 0.2);
          box-shadow: 0 40px 100px rgba(200, 255, 87, 0.05);
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