import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Cpu, Crown, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-white overflow-hidden selection:bg-[#C8FF57] selection:text-black">
      
      {/* --- ADVANCED LIQUID ENGINE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

        {/* Dynamic Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 80, -40, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[900px] h-[900px] bg-[#C8FF57]/8 rounded-full blur-[140px]"
        />
        
        <motion.div 
          animate={{ 
            x: [0, -100, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[1000px] h-[1000px] bg-[#7B6EF6]/8 rounded-full blur-[160px]"
        />
      </div>

      {/* --- CONTENT ARCHITECTURE --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-48"
      >
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-48">
          <motion.div variants={itemVariants} className="mb-12">
            <div className="liquid-badge">
              <Crown size={14} className="text-[#C8FF57]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60">Jacques Design Studio</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title mb-14">
            L'INGÉNIERIE DU <br />
            <span className="liquid-gradient-text">VIRAL ABSOLU</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description mb-16">
            ScriptGen fusionne l'intelligence artificielle de pointe et l'esthétique du verre pour sculpter des récits qui dominent l'attention numérique.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link to="/design" className="cta-liquid-button group">
              <span className="relative z-10 flex items-center gap-4">
                DÉBUTER L'EXPÉRIENCE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              <div className="cta-glow"></div>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-48">
          {[
            { icon: <Cpu size={28} />, title: "Analyse Cognitive", desc: "Nos algorithmes décodent la structure visuelle de vos designs pour en extraire le potentiel narratif maximal." },
            { icon: <Target size={28} />, title: "Précision Algorithmique", desc: "Chaque script est optimisé pour les mécanismes de rétention spécifiques de TikTok, Instagram et YouTube." },
            { icon: <ShieldCheck size={28} />, title: "Standard Premium", desc: "Une qualité de rédaction chirurgicale qui surpasse les standards des meilleures agences de copywriting." }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className="feature-card group">
              <div className="card-glass-inner">
                <div className="icon-box mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-outfit mb-6 text-white/90">{feature.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed group-hover:text-gray-400 transition-colors duration-500">{feature.desc}</p>
              </div>
              <div className="card-glow-border"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Engine */}
        <motion.div variants={itemVariants} className="stats-container mb-48">
          {[
            { label: "Scripts Générés", value: "50K+" },
            { label: "Taux de Rétention", value: "85%" },
            { label: "Vues Cumulées", value: "100M+" },
            { label: "Satisfaction", value: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Final CTA Section */}
        <motion.div variants={itemVariants} className="final-cta-section">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex justify-center gap-2 mb-12">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C8FF57" className="text-[#C8FF57]" />)}
            </div>
            <h2 className="font-outfit text-5xl md:text-8xl font-black mb-12 leading-[0.95] tracking-tighter">
              PRÊT À DÉFINIR LE <br /> <span className="text-[#C8FF57]">NOUVEAU STANDARD ?</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed max-w-2xl mx-auto">
              Rejoignez l'élite des créateurs qui utilisent l'IA pour sculpter l'avenir du contenu digital.
            </p>
            <Link to="/design" className="final-button">
              ACCÈS IMMÉDIAT
            </Link>
          </div>
          <div className="section-liquid-bg"></div>
        </motion.div>
      </motion.div>

      <style>{`
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3.5rem, 10vw, 8.5rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.05em;
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
          font-size: clamp(1.1rem, 2vw, 1.75rem);
          color: #888;
          max-width: 850px;
          line-height: 1.6;
          font-weight: 500;
        }

        .liquid-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }

        .cta-liquid-button {
          position: relative;
          padding: 26px 56px;
          background: #C8FF57;
          color: #000;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 60px rgba(200, 255, 87, 0.25);
        }

        .cta-liquid-button:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 30px 80px rgba(200, 255, 87, 0.35);
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
          border-radius: 56px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-glass-inner {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(50px);
          border-radius: 56px;
          padding: 56px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .feature-card:hover {
          transform: translateY(-20px);
          background: linear-gradient(135deg, #C8FF57, transparent, #7B6EF6);
        }

        .icon-box {
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8FF57;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .stats-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 40px;
          padding: 60px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          color: #C8FF57;
          line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 0 30px rgba(200, 255, 87, 0.3);
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #555;
        }

        .final-cta-section {
          position: relative;
          border-radius: 100px;
          padding: 120px 40px;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
          box-shadow: 0 50px 120px rgba(0,0,0,0.5);
        }

        .final-button {
          display: inline-flex;
          align-items: center;
          padding: 24px 64px;
          background: white;
          color: black;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1.2rem;
          transition: all 0.4s;
          box-shadow: 0 20px 50px rgba(255,255,255,0.1);
        }

        .final-button:hover {
          transform: scale(1.05);
          box-shadow: 0 30px 70px rgba(255,255,255,0.2);
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

        @media (max-width: 768px) {
          .card-glass-inner { padding: 40px; }
          .final-cta-section { border-radius: 60px; padding: 80px 24px; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;