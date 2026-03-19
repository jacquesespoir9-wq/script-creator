import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="absolute top-20 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            <a href="/" className="text-lg font-medium text-gray-200 hover:text-[#F9825A]">Accueil</a>
            <a href="/instagram" className="text-lg font-medium text-gray-200 hover:text-[#F9825A]">Instagram</a>
            <a href="/tiktok" className="text-lg font-medium text-gray-200 hover:text-[#F9825A]">TikTok</a>
            <a href="/youtube" className="text-lg font-medium text-gray-200 hover:text-[#F9825A]">YouTube</a>
            <a href="/facebook" className="text-lg font-medium text-gray-200 hover:text-[#F9825A]">Facebook</a>
            <hr className="border-white/10" />
            <button className="w-full rounded-xl bg-[#F9825A] py-3 font-bold text-white shadow-[0_0_20px_rgba(249,130,90,0.3)]">
              Commencer
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;