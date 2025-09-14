import { motion } from 'framer-motion';
import React from 'react';

export default function HireButton({ gradient, themeBg, primary, onClick }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.button
        onClick={onClick}
        className="relative px-12 py-6 text-2xl font-bold rounded-full transition-all duration-300 transform"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`, color: themeBg, boxShadow: `0 10px 30px ${primary}40` }}
        whileHover={{ scale: 1.05, boxShadow: `0 15px 40px ${primary}60` }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center">
          Hire Me
          <motion.span className="ml-3 text-3xl" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🚀</motion.span>
        </span>
      </motion.button>
    </motion.div>
  );
}
