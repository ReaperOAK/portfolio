

import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';


import WireframeIcosahedronBg from '../components/WireframeIcosahedron';
import TypingRoles from '../components/TypingRoles';

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
            <br />
            <TypingRoles
              roles={["Full Stack Developer", "MERN Engineer", "Writer", "Creative Coder", "Open Source Enthusiast"]}
              typingSpeed={70}
              pause={1200}
              className="text-xl md:text-3xl text-primary mt-2"
            />
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8 text-center max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to my portfolio!
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="/projects"
              className="px-6 py-2 rounded-lg font-semibold bg-primary text-white shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              aria-label="View Projects"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-6 py-2 rounded-lg font-semibold bg-accent text-white shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors duration-200"
              aria-label="Hire Me"
            >
              Hire Me
            </a>
            <a
              href="/blog"
              className="px-6 py-2 rounded-lg font-semibold border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              aria-label="Read Blogs"
            >
              Read Blogs
            </a>
          </motion.div>
        </div>
      {/* Scroll-down indicator (bottom of hero section) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <span className="block w-1.5 h-8 rounded-full bg-primary mb-1 animate-bounce" style={{ opacity: 0.7 }}></span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary animate-bounce" viewBox="0 0 24 24" aria-label="Scroll down">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          <span className="text-xs text-primary mt-1 opacity-80">Scroll</span>
        </motion.div>
      </div>
    </section>
  </>
  );
}
