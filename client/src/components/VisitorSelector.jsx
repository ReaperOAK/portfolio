
import { useEffect, useRef, useState } from 'react';
import { useVisitor } from '../contexts/VisitorContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const visitorTypes = [
  {
    key: 'recruiter',
    label: 'Recruiter',
    desc: 'Looking to hire or connect? See my work and skills.',
    bg: '/bg/recruiter.png',
  },
  {
    key: 'client',
    label: 'Client',
    desc: 'Interested in collaboration or services? Let’s build together.',
    bg: '/bg/client.png',
  },
  {
    key: 'developer',
    label: 'Developer',
    desc: 'Explore my code, projects, and dev journey.',
    bg: '/bg/developer.png',
  },
  {
    key: 'poet',
    label: 'Creative Soul',
    desc: 'Dive into my poetry, writing, and creative work.',
    bg: '/bg/poet.png',
  },
];



export default function VisitorSelector({ open, onClose }) {
  const { setVisitorType } = useVisitor();
  const { setTheme } = useTheme();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);

  // Keyboard navigation for accessibility
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setFocused((prev) => {
          let idx = prev ?? 0;
          if (e.key === 'ArrowLeft') idx = (idx - 1 + visitorTypes.length) % visitorTypes.length;
          if (e.key === 'ArrowRight') idx = (idx + 1) % visitorTypes.length;
          return idx;
        });
      }
      if ((e.key === 'Enter' || e.key === ' ') && focused !== null) {
        handleSelect(visitorTypes[focused].key);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, focused, onClose]);

  const handleSelect = (type) => {
    setVisitorType(type);
    setTheme(type, false);
    if (onClose) onClose();
  };

  if (!open) return null;

  // Responsive: stack vertically on mobile
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-row md:flex-row flex-col md:h-screen h-full w-full bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
      >
        {visitorTypes.map((v, idx) => {
          const isActive = hovered === idx || focused === idx;
          return (
            <motion.button
              key={v.key}
              type="button"
              className="group relative flex-1 flex flex-col items-center justify-end overflow-hidden outline-none focus:z-20"
              style={{ minWidth: 0, minHeight: 0 }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setFocused(idx)}
              onBlur={() => setFocused(null)}
              tabIndex={0}
              onClick={() => handleSelect(v.key)}
              initial={false}
              animate={{
                flex: isActive ? 2 : 1,
                filter: isActive ? 'brightness(1.1) blur(0px)' : 'brightness(0.7) blur(0px)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              <span
                className="absolute inset-0 w-full h-full"
                style={{
                  // Use image-set to prefer AVIF/WebP when supported, fall back to PNG
                  backgroundImage: `image-set(url(${v.bg.replace(/\.png$/, '.avif')}) type('image/avif') 1x, url(${v.bg.replace(/\.png$/, '.webp')}) type('image/webp') 1x, url(${v.bg}) 1x)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0,
                  transition: 'filter 0.3s',
                }}
                aria-hidden="true"
              />
              <span className="absolute inset-0 bg-black/60 group-hover:bg-black/40 group-focus:bg-black/40 transition-colors z-10" />
              <span className="relative z-20 flex flex-col items-center justify-center w-full h-full p-6 md:p-10">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-white drop-shadow mb-2 transition-all"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                >
                  {v.label}
                </motion.h2>
                {isActive && (
                  <motion.p
                    className="text-white/90 mb-4 text-base md:text-lg drop-shadow transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {v.desc}
                  </motion.p>
                )}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="inline-block px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold text-lg shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition">
                      Enter
                    </span>
                  </motion.span>
                )}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
