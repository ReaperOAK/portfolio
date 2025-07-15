

import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import WireframeIcosahedronBg from '../components/WireframeIcosahedron';

export default function Home() {
  const { themeVars } = useTheme();

  useEffect(() => {
    // Delay cards until after hero/wireframe anim (e.g. 1.6s)
    const t = setTimeout(() => setShowCards(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Hero section with wireframe background */}
      <section className="relative flex flex-col items-center justify-center min-h-screen transition-colors duration-500 overflow-hidden" style={{ background: themeVars.background, color: themeVars.foreground }}>
        <WireframeIcosahedronBg color={themeVars.accent} />
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.h1
            className="text-5xl md:text-6xl font-display font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
          >
            Engineer by logic, poet by soul
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8 text-center max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to my portfolio!
          </motion.p>
        </div>
      </section>
    </>
  );
}
