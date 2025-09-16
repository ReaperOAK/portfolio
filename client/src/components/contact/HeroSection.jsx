import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import React, { Suspense, lazy, useRef } from 'react';
import usePrefetchOnViewport from '../../hooks/usePrefetchOnViewport';
const ContactPortal = lazy(() => import('./ContactPortal'));

export default function HeroSection({ onEnterContact }) {
  const { themeVars } = useTheme();

  const heroRef = useRef(null);
  usePrefetchOnViewport(heroRef, () => import('./ContactPortal'), '200px', 'src/components/contact/ContactPortal.jsx');

  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';
  const gradient = themeVars?.gradient || ['#FB7185', '#C084FC'];

  return (
  <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8">
      {/* Animated background gradients */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ 
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          width: 'min(40vw, 384px)',
          height: 'min(40vw, 384px)',
          top: '15%',
          left: '6%'
        }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ 
          background: `linear-gradient(225deg, ${gradient[1]}, ${gradient[0]})`,
          width: 'min(34vw, 320px)',
          height: 'min(34vw, 320px)',
          bottom: '22%',
          right: '8%',
          animationDelay: '1s'
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <motion.div
        className="text-center z-10 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let's build something{' '}
          <span 
            className="bg-gradient-to-r bg-clip-text text-transparent animate-pulse"
            style={{ backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
          >
            legendary
          </span>{' '}
          together 🚀
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl opacity-80 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Ready to turn ideas into reality? Choose your adventure below.
        </motion.p>

        {/* 3D Portal Component */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Suspense fallback={<div aria-hidden className="w-64 h-64 mx-auto bg-transparent" />}>
            <ContactPortal />
          </Suspense>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onEnterContact}
          className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ 
            borderColor: primary,
            backgroundColor: 'transparent',
            color: primary
          }}
          whileHover={{ 
            backgroundColor: primary,
            color: themeVars?.background || '#1C0C2E',
            boxShadow: `0 0 30px ${primary}40`
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="relative z-10">Step Into Contact</span>
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
            }}
          />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: primary }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: primary }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
