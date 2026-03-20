import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Cpu, Crown, ArrowRight, ShieldCheck, Star, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020203] text-white overflow-hidden selection:bg-[#C8FF57] selection:text-black">
      
      {/* --- LIQUID BACKGROUND ENGINE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Liquid Blob */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#C8FF57]/10 rounded-full blur-[120px]"
        />
        
        {/* Secondary Liquid Blob */}
        <motion.div 
          animate={{ 
            x: [0, -150, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 0.8, 1.1, 1],
            rotate: [0, -120, -240, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-[#7B6EF6]/10 rounded-full blur-[140px]"
        />

        {/* Accent Liquid Blob */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
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
            className="liquid-glass-badge mb-10"
          >
            <Crown size={14} className="text-[#C8FF57]" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/70">L'Excellence par Jacques Design</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-outfit text-7xl md:text-[130px] font-black tracking-tighter leading-[0.8] mb-12"
          >
            <span className="text-white">L'INGÉNIERIE DU</span> <br />
            <span className="liquid-text">VIRAL ABSOLU</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-xl md:text-3xl max-w-4xl font-medium leading-relaxed mb-16 opacity-80"
          >
            ScriptGen fusionne l'intelligence artificielle de pointe et l'esthétique du verre pour sculpter des récits qui dominent l'attention.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link 
              to="/design" 
              className="liquid-button group"
            >
              <span className="relative z-10 flex items-center gap-4">
                DÉBUTER L'EXPÉRIENCE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="button-glow"></div>
            </Link>
          </motion.div>
        </div>

        {/* Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { icon: <Cpu size={32} />, title: "Analyse Cognitive", desc: "Nos algorithmes décodent la structure visuelle de vos designs pour en extraire le potentiel narratif maximal." },
            { icon: <Target size={32} />, title: "Précision Algorithmique", desc: "Chaque script est optimisé pour les mécanismes de rétention spécifiques de TikTok, Instagram et YouTube." },
            { icon: <ShieldCheck size={32} />, title: "Standard Premium", desc: "Une qualité de rédaction chirurgicale qui surpasse les standards des meilleures agences de copywriting." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="liquid-glass-card group"
            >
              <div className="card-inner">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 text-[#C8FF57] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold font-outfit mb-6 text-white/90">{feature.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed group-hover:text-gray-400 transition-colors">{feature.desc}</p>
              </div>
              <div className="card-border"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="relative py-20 border-y border-white/5 mb-40 flex flex-wrap justify-around gap-12"
        >
          {[
            { label: "Scripts Générés", value: "50K+" },
            { label: "Taux de Rétention", value: "85%" },
            { label: "Vues Cumulées", value: "100M+" },
            { label: "Satisfaction", value: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black font-outfit text-[#C8FF57] mb-2 drop-shadow-[0_0_20px_rgba(200,255,87,0.3)]">{stat.value}</div>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Final CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-[80px] overflow-hidden p-12 md:p-32 text-center liquid-glass-section"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex justify-center gap-2 mb-10">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#C8FF57" className="text-[#C8FF57]" />)}
            </div>
            <h2 className="font-outfit text-5xl md:text-8xl font-black mb-10 leading-tight">
              PRÊT À DÉFINIR LE <br /> <span className="text-[#C8FF57]">NOUVEAU STANDARD ?</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed">
              Rejoignez l'élite des créateurs qui utilisent l'intelligence artificielle pour sculpter l'avenir du contenu digital.
            </p>
            <Link 
              to="/design" 
              className="inline-flex items-center gap-4 px-14 py-7 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            >
              ACCÈS IMMÉDIAT
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .liquid-text {
          background: linear-gradient(135deg, #C8FF57 0%, #7B6EF6 50%, #C8FF57 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: liquid-flow 5s linear infinite;
        }

        @keyframes liquid-flow {
          to { background-position: 200% center; }
        }

        .liquid-glass-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .liquid-button {
          position: relative;
          padding: 24px 48px;
          background: #C8FF57;
          color: #000;
          border-radius: 100px;
          font-weight: 900;
          font-size: 18px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 40px rgba(200, 255, 87, 0.2);
        }

        .button-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .liquid-button:hover .button-glow {
          opacity: 0.3;
        }

        .liquid-glass-card {
          position: relative;
          border-radius: 48px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-inner {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          border-radius: 48px;
          padding: 48px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .liquid-glass-card:hover {
          transform: translateY(-15px) scale(1.02);
          background: linear-gradient(135deg, #C8FF57, transparent, #7B6EF6);
        }

        .liquid-glass-section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(60px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
};

export default HomePage;