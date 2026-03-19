import React from 'react';
import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <motion.a
      href={href}
      className="relative px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-[#F9825A]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F9825A]"
        whileHover={{ width: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </motion.a>
  );
};

export default NavLink;