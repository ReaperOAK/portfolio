import React from "react";
import SectionWrapper from "./SectionWrapper";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CupSoda, Brain, BookOpen, Rocket } from "lucide-react";

import { facts as factsRaw } from "../../data/funFacts";

// Map icon string to Lucide component
const iconMap = { BookOpen, CupSoda, Brain };
const facts = factsRaw;

// Rocket flying in a random direction, reveals fact on click

function RocketFact({ fact, angle, speed, onDone }) {
  // angle: degrees (0 = right, 90 = down, 180 = left, 270 = up)
  // speed: duration in seconds
  // Start at a random edge, fly off in the given angle
  const [showFact, setShowFact] = useState(false);
  // Calculate start and end positions based on angle
  // We'll use viewport width/height units for simplicity
  const rads = angle * (Math.PI / 180);
  const startX = 50 - 45 * Math.cos(rads); // center, then out to edge
  const startY = 50 - 45 * Math.sin(rads);
  const endX = 50 + 60 * Math.cos(rads); // offscreen
  const endY = 50 + 60 * Math.sin(rads);

  // Calculate the actual path angle in screen space
  const pathAngle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  // Lucide Rocket points at 60deg by default, so subtract 60deg
  const rocketRotation = pathAngle + 30;

  return (
    <>
      <motion.div
        className="fixed z-50 select-none"
        style={{ left: 0, top: 0, pointerEvents: 'auto' }}
        initial={{ x: `${startX}vw`, y: `${startY}vh`, opacity: 0 }}
        animate={{ x: `${endX}vw`, y: `${endY}vh`, opacity: [1, 1, 0.7, 0] }}
        transition={{ duration: speed, ease: 'linear' }}
        onAnimationComplete={onDone}
      >
        <div
          className="relative flex items-center justify-center cursor-pointer group"
          tabIndex={0}
          role="button"
          aria-label={showFact ? `${fact.label}: ${fact.value}` : `Show fun fact`}
          onClick={() => setShowFact(f => !f)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowFact(f => !f)}
          style={{ outline: 'none' }}
        >
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <Rocket
              className="w-9 h-9 text-fuchsia-500 drop-shadow-lg transition-transform duration-200 group-hover:scale-110"
              style={{ transform: `rotate(${rocketRotation}deg)` }}
              aria-hidden="true"
            />
          </span>
          {showFact && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 shadow-xl backdrop-blur-md min-w-[200px] max-w-xs text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1 text-base font-semibold text-slate-800 dark:text-slate-100">
                {iconMap[fact.icon] && React.createElement(iconMap[fact.icon], { className: "w-5 h-5 text-blue-500 mr-1", "aria-hidden": "true" })}
                {fact.label}
              </div>
              <div className="text-slate-600 dark:text-slate-300 text-sm italic">{fact.value}</div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}



export default function FunFactsSection() {

  // Manage rockets
  const [rockets, setRockets] = useState([]);
  const timer = useRef();

  // Spawn a rocket at random intervals
  useEffect(() => {
    function spawnRocket() {
      const fact = facts[Math.floor(Math.random() * facts.length)];
      const angle = Math.random() * 360; // 0-359 degrees
      const speed = 5 + Math.random() * 3; // 5-8s
      setRockets(rks => [
        ...rks,
        { id: Math.random().toString(36).slice(2), fact, angle, speed }
      ]);
      // Next spawn: 4-10s
      timer.current = setTimeout(spawnRocket, 4000 + Math.random() * 6000);
    }
    timer.current = setTimeout(spawnRocket, 2000);
    return () => clearTimeout(timer.current);
  }, []);

  // Remove rocket when done
  const handleDone = id => setRockets(rks => rks.filter(r => r.id !== id));

  return (
    <SectionWrapper>
      <AnimatePresence>
        {rockets.map(r => (
          <RocketFact key={r.id} fact={r.fact} angle={r.angle} speed={r.speed} onDone={() => handleDone(r.id)} />
        ))}
      </AnimatePresence>
      {/* Optionally, static fallback for no-JS or SEO: */}
      <div className="hidden">
        {facts.map((fact, i) => (
          <div key={i}>{fact.label}: {fact.value}</div>
        ))}
      </div>
    </SectionWrapper>
  );
}
