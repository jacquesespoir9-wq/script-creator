import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Cpu, Crown, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-white overflow-hidden selection:bg-[#C8FF57] selection:text-black">
      
      {/* --- ADVANCED LIQUID ENGINE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

        <motion.div 
          animate={{ 
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[140%] md:w-[900px] h-[600px] md:h-[900px] bg-[#C8FF57]/5 rounded-full blur-[100px] md:blur-[140px]"
        />
        
        <motion.div 
          animate={{ 
            x: [0, -50, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.95, 1.02, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[140%] md:w-[1000px] h-[600px] md:h-[1000px] bg-[#7B6EF6]/5 rounded-full blur-[100px] md:blur-[160px]"
        />
      </div>

      {/* --- CONTENT ARCHITECTURE --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-32 pb-32 md:pb-48"
      >
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.h1 variants={itemVariants} className="hero-title mb-8 md:mb-14">
            L'INGÉNIERIE DU <br />
            <span className="liquid-gradient-text">VIRAL ABSOLU</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description mb-10 md:mb-16">
            ScriptGen fusionne l'intelligence artificielle de pointe et l'esthétique du verre pour sculpter des récits qui dominent l'attention numérique.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full sm:w-auto">
            <Link to="/design" className="cta-liquid-button group w-full sm:w-auto inline-flex justify-center">
              <span className="relative z-10 flex items-center gap-3 md:gap-4">
                DÉBUTER L'EXPÉRIENCE <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              <div className="cta-glow"></div>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-24 md:mb-48">
          {[
            { icon: <Cpu size={24} />, title: "Analyse Cognitive", desc: "Nos algorithmes décodent la structure visuelle de vos designs pour en extraire le potentiel narratif maximal." },
            { icon: <Target size={24} />, title: "Précision Algorithmique", desc: "Chaque script est optimisé pour les mécanismes de rétention spécifiques de TikTok, Instagram et YouTube." },
            { icon: <ShieldCheck size={24} />, title: "Standard Premium", desc: "Une qualité de rédaction chirurgicale qui surpasse les standards des meilleures agences de copywriting." }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className="feature-card group">
              <div className="card-glass-inner flex flex-col items-center text-center">
                <div className="icon-box mb-6 md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-outfit mb-4 md:mb-6 text-white/90">{feature.title}</h3>
                <p className="text-gray-500 text-sm md:text-lg leading-relaxed group-hover:text-gray-400 transition-colors duration-500">{feature.desc}</p>
              </div>
              <div className="card-glow-border"></div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA Section */}
        <motion.div variants={itemVariants} className="final-cta-section text-center">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex justify-center gap-1.5 md:gap-2 mb-8 md:mb-12">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C8FF57" className="text-[#C8FF57] md:w-[18px] md:h-[18px]" />)}
            </div>
            <h2 className="font-outfit text-3xl sm:text-5xl md:text-8xl font-black mb-8 md:mb-12 leading-[1.1] md:leading-[0.95] tracking-tighter">
              PRÊT À DÉFINIR LE <br className="hidden sm:block" /> <span className="text-[#C8FF57]">NOUVEAU STANDARD ?</span>
            </h2>
            <p className="text-gray-400 text-base md:text-2xl mb-10 md:mb-16 leading-relaxed max-w-2xl mx-auto px-4">
              Rejoignez l'élite des créateurs qui utilisent l'IA pour sculpter l'avenir du contenu digital.
            </p>
            <Link to="/design" className="final-button w-full sm:w-auto inline-flex justify-center">
              ACCÈS IMMÉDIAT
            </Link>
          </div>
          <div className="section-liquid-bg"></div>
        </motion.div>
      </motion.div>

      <style>{`
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.2rem, 8vw, 8.5rem);
          font-weight: 900;
          line-height: 1;
          md:line-height: 0.85;
          letter-spacing: -0.04em;
          color: white;
        }

        .liquid-gradient-text {
          background: linear-gradient(135deg, #C8FF57 0%, #7B6EF6 50%, #C8FF57 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flow 6s linear infinite;
        }

        @keyframes flow {
          to { background-position: 200% center; }
        }

        .hero-description {
          font-size: clamp(0.95rem, 1.5vw, 1.75rem);
          color: #888;
          max-width: 850px;
          line-height: 1.6;
          font-weight: 500;
          padding: 0 1rem;
        }

        .liquid-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          md:gap: 12px;
          padding: 8px 20px;
          md:padding: 12px 28px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
        }

        .cta-liquid-button {
          position: relative;
          padding: 18px 36px;
          md:padding: 26px 56px;
          background: #C8FF57;
          color: #000;
          border-radius: 100px;
          font-weight: 900;
          font-size: 0.9rem;
          md:font-size: 1.1rem;
          letter-spacing: 0.05em;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 15px 40px rgba(200, 255, 87, 0.2);
        }

        .cta-liquid-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 25px 60px rgba(200, 255, 87, 0.3);
        }

        .cta-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }

        .cta-liquid-button:hover .cta-glow {
          opacity: 1;
        }

        .feature-card {
          position: relative;
          border-radius: 32px;
          md:border-radius: 56px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-glass-inner {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(50px);
          border-radius: 32px;
          md:border-radius: 56px;
          padding: 32px;
          md:padding: 56px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          md:transform: translateY(-20px);
          background: linear-gradient(135deg, #C8FF57, transparent, #7B6EF6);
        }

        .icon-box {
          width: 56px;
          height: 56px;
          md:width: 72px;
          md:height: 72px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          md:border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8FF57;
        }

        .final-cta-section {
          position: relative;
          border-radius: 40px;
          md:border-radius: 100px;
          padding: 60px 20px;
          md:padding: 120px 40px;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .final-button {
          display: inline-flex;
          align-items: center;
          padding: 20px 48px;
          md:padding: 24px 64px;
          background: white;
          color: black;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1rem;
          md:font-size: 1.2rem;
          transition: all 0.4s;
        }

        .final-button:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 50px rgba(255,255,255,0.15);
        }

        .section-liquid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(200, 255, 87, 0.05), transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .hero-title { font-size: 2.8rem; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;