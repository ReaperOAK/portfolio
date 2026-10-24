

import SectionWrapper from "./SectionWrapper";
import PersonaCard from "./persona/PersonaCard";
import { personas } from "../../data/personaData";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCog } from "lucide-react";


export default function PersonaSection() {
  // Responsive visibleCount
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768) return 3;
    if (w >= 640) return 2;
    return 1;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Infinite carousel logic
  const total = personas.length;
  const [index, setIndex] = useState(visibleCount); // Start at first real slide
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef();

  // Clone slides for infinite effect
  const slides = [
    ...personas.slice(-visibleCount),
    ...personas,
    ...personas.slice(0, visibleCount),
  ];
  const slideCount = slides.length;
  const realStart = visibleCount;
  const realEnd = realStart + total - 1;

  // When visibleCount changes, reset index
  useEffect(() => {
    setIndex(visibleCount);
  }, [visibleCount, total]);

  // Handle transition end for seamless loop
  useEffect(() => {
    if (!isAnimating) return;
    const handle = () => {
      setIsAnimating(false);
      if (index < realStart) {
        setIndex(realEnd);
      } else if (index > realEnd) {
        setIndex(realStart);
      }
    };
    const node = trackRef.current;
    if (node) {
      node.addEventListener('transitionend', handle, { once: true });
      return () => node.removeEventListener('transitionend', handle);
    }
  }, [index, isAnimating, realStart, realEnd]);

  const goLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(i => i - 1);
  };
  const goRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(i => i + 1);
  };

  // For indicators
  const getActive = () => {
    let i = index - realStart;
    if (i < 0) i += total;
    if (i >= total) i -= total;
    return i;
  };

  return (
    <SectionWrapper>
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <UserCog className="inline-block w-7 h-7 text-primary align-middle" aria-hidden="true" />
        <span>Who I Am Beyond Code</span>
      </h2>
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
          <div
            ref={trackRef}
            className="flex gap-6 transition-transform duration-500"
            style={{
              width: `${(slideCount / visibleCount) * 100}%`,
              transform: `translateX(-${index * (100 / slideCount)}%)`,
              transition: isAnimating ? 'transform 0.5s cubic-bezier(.4,2,.3,1)' : 'none',
            }}
          >
            {slides.map((p, i) => (
              <div key={i} style={{ width: `${100 / slideCount}%` }}>
                <PersonaCard {...p} />
              </div>
            ))}
          </div>
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
      {/* Indicators intentionally removed per design decision; navigation uses arrows only */}
    </SectionWrapper>
  );
}
