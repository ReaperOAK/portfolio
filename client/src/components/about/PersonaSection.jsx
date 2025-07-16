import SectionWrapper from "./SectionWrapper";
import PersonaCard from "./persona/PersonaCard";
import { personas } from "../../data/personaData";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PersonaSection() {
  // Carousel logic
  const [index, setIndex] = useState(0);
  // Responsive: 1 on mobile, 2 on sm, 3 on md, 4 on lg+
  let visibleCount = 1;
  if (typeof window !== 'undefined') {
    const w = window.innerWidth;
    if (w >= 1024) visibleCount = 4;
    else if (w >= 768) visibleCount = 3;
    else if (w >= 640) visibleCount = 2;
  }
  // Clamp index
  const maxIndex = Math.max(0, personas.length - visibleCount);
  const goLeft = () => setIndex(i => (i - 1 + (maxIndex + 1)) % (maxIndex + 1));
  const goRight = () => setIndex(i => (i + 1) % (maxIndex + 1));

  // Listen for resize to update visibleCount
  // (simple, not perfect, but works for most cases)
  // Could use a custom hook for better SSR/CSR
  const [_, setRerender] = useState(0);
  if (typeof window !== 'undefined') {
    window.onresize = () => setRerender(r => r + 1);
  }

  return (
    <SectionWrapper>
      <h2 className="text-2xl font-bold mb-6 text-center">🎭 Who I Am Beyond Code</h2>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 z-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-md"
          onClick={goLeft}
          aria-label="Previous personas"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${index * (100 / visibleCount)}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            style={{ width: `${(personas.length / visibleCount) * 100}%` }}
          >
            {personas.map((p, i) => (
              <div key={i} style={{ width: `${100 / personas.length}%` }}>
                <PersonaCard {...p} />
              </div>
            ))}
          </motion.div>
        </div>
        <button
          className="absolute right-0 z-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-md"
          onClick={goRight}
          aria-label="Next personas"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-primary scale-125' : 'bg-slate-400 opacity-60'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
