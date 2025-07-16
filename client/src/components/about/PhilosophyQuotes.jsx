import SectionWrapper from "./SectionWrapper";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

const quotes = [
  "I write code the way I write shayari: minimal, meaningful, and honest.",
  "Every bug is a poem waiting to be understood.",
  "Simplicity is the ultimate sophistication — both in code and verse."
];

export default function PhilosophyQuotes() {
  const [index, setIndex] = useState(0);
  const { themeVars } = useTheme();

  // Keyboard navigation for accessibility
  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % quotes.length);
    if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + quotes.length) % quotes.length);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper>
      <div className="relative min-h-[60px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            className="text-center italic text-lg font-serif px-2"
            style={{ color: themeVars?.subtle || '#94A3B8' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            aria-live="polite"
          >
            “{quotes[index]}”
          </motion.blockquote>
        </AnimatePresence>
        <div className="absolute right-2 top-1 flex gap-1">
          {quotes.map((_, i) => (
            <button
              key={i}
              aria-label={`Show quote ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === index ? 'scale-125' : 'opacity-60'}`}
              style={{ background: i === index ? themeVars?.primary : themeVars?.subtle }}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
