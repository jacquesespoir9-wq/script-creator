import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PLATFORMS } from '../constants';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <h1 className="font-outfit text-2xl font-black tracking-tighter">
          Script<span className="text-[#C8FF57]">Gen</span>
        </h1>
        <div className="flex items-center gap-5">
          <Heart size={24} />
          <div className="relative">
            <MessageCircle size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </div>
        </div>
      </header>

      {/* Stories Section (Platforms) */}
      <div className="flex overflow-x-auto py-4 px-4 gap-4 no-scrollbar border-b border-white/5">
        {PLATFORMS.map((platform) => (
          <Link key={platform.id} to={`/${platform.id}`} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#FFD600] via-[#FF7A00] to-[#FF0069]">
              <div className="w-[72px] h-[72px] rounded-full bg-black border-2 border-black flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-[#C8FF57]">
                  <PlatformIcon id={platform.id} size={32} />
                </div>
              </div>
            </div>
            <span className="text-[11px] font-medium text-gray-300 truncate w-20 text-center">
              {platform.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Feed Section */}
      <div className="max-w-md mx-auto">
        {[
          {
            user: "Jacques Design",
            tag: "Premium AI",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
            caption: "L'intelligence artificielle redéfinit les codes du design viral. Prêt à créer votre prochain chef-d'œuvre ?",
            likes: "12,405"
          },
          {
            user: "ScriptGen Bot",
            tag: "New Feature",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
            caption: "Nouveau mode Copywriting disponible. Transformez vos idées en textes de vente chirurgicaux.",
            likes: "8,932"
          }
        ].map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C8FF57] flex items-center justify-center text-black font-bold text-xs">
                  JD
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1">
                    {post.user} <Sparkles size={10} className="text-[#C8FF57]" />
                  </div>
                  <div className="text-[10px] text-gray-500">{post.tag}</div>
                </div>
              </div>
              <MoreHorizontal size={18} className="text-gray-400" />
            </div>

            {/* Post Image */}
            <div className="aspect-square w-full bg-white/5 overflow-hidden">
              <img src={post.image} alt="post" className="w-full h-full object-cover" />
            </div>

            {/* Post Actions */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <Heart size={24} />
                  <MessageCircle size={24} />
                  <Send size={24} />
                </div>
                <Bookmark size={24} />
              </div>
              
              <div className="text-sm font-bold mb-1">{post.likes} J'aime</div>
              <div className="text-sm leading-snug">
                <span className="font-bold mr-2">{post.user}</span>
                <span className="text-gray-300">{post.caption}</span>
              </div>
              <div className="text-[10px] text-gray-500 uppercase mt-2 tracking-wider">Il y a 2 heures</div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HomePage;