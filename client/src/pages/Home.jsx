
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import React, { useEffect, Suspense, lazy, useRef, useState } from 'react';
import { useSEO, SEOHead, seoConfigs } from '../hooks/useSEO.jsx';
import usePrefetchOnViewport from '../hooks/usePrefetchOnViewport';
const WireframeIcosahedronBg = lazy(() => import('../components/WireframeIcosahedron'));
import TypingRoles from '../components/TypingRoles';

export default function Home() {
  const { themeVars } = useTheme();
  
  // SEO configuration
  const seoConfig = useSEO(seoConfigs.home);
  const heroRef = useRef(null);
  usePrefetchOnViewport(heroRef, () => import('../components/WireframeIcosahedron'), '200px', 'src/components/WireframeIcosahedron.jsx');

  // Small helpers to apply a themed focus ring using inline styles
  const setFocusRing = (e, color) => {
    try {
      e.currentTarget.style.boxShadow = `0 0 0 4px ${color}33`;
    } catch (err) {
      // noop - defensive
    }
  };
  const clearFocusRing = (e) => {
    try {
      e.currentTarget.style.boxShadow = 'none';
    } catch (err) {
      // noop
    }
  };

  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Delay cards until after hero/wireframe anim (e.g. 1.6s)
    const t = setTimeout(() => setShowCards(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SEOHead config={seoConfig} />
      {/* Hero section with wireframe background */}
      <main>
  <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen transition-colors duration-500 overflow-hidden" style={{ background: themeVars.background, color: themeVars.foreground }}>
          {/* prefetch when hero is near viewport */}
          <Suspense fallback={
            <div aria-hidden className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-transparent to-transparent" />
          }>
            <WireframeIcosahedronBg color={themeVars.accent} />
          </Suspense>
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
              className="px-6 py-2 rounded-lg font-semibold text-white shadow-md hover:bg-opacity-90 focus:outline-none transition-colors duration-200"
              aria-label="View Projects"
              style={{ backgroundColor: themeVars.primary, color: themeVars.buttonText || '#fff' }}
              onFocus={(e) => setFocusRing(e, themeVars.primary)}
              onBlur={clearFocusRing}
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-6 py-2 rounded-lg font-semibold text-white shadow-md hover:bg-opacity-90 focus:outline-none transition-colors duration-200"
              aria-label="Hire Me"
              style={{ backgroundColor: themeVars.accent, color: themeVars.buttonText || '#fff' }}
              onFocus={(e) => setFocusRing(e, themeVars.accent)}
              onBlur={clearFocusRing}
            >
              Hire Me
            </a>
            {/* <a
              href="/blog"
              className="px-6 py-2 rounded-lg font-semibold border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              aria-label="Read Blogs"
            >
              Read Blogs
            </a> */}
          </motion.div>
        </div>
      </section>
      </main>
    </>
  );
}
