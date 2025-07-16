import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";


export default function PersonaCard({ icon, title, description }) {
  const { themeVars } = useTheme();
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped((f) => !f);
  return (
    <motion.div
      className="w-full h-64 cursor-pointer focus:outline-none z-0"
      tabIndex={0}
      aria-label={title}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={handleFlip}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleFlip()}
      role="button"
      style={{ perspective: 1000 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          rotateY: flipped ? 180 : 0,
          transition: 'transform 0.6s cubic-bezier(.4,2,.3,1)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border p-4 bg-gradient-to-br from-gray-900 to-slate-800"
          style={{
            color: themeVars?.foreground,
            background: themeVars?.subtle,
            borderColor: themeVars?.border,
            backfaceVisibility: 'hidden',
            zIndex: 2,
          }}
        >
          <h3 className="text-xl mt-2 font-semibold">{title}</h3>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border p-4 text-sm"
          style={{
            color: themeVars?.foreground,
            background: themeVars?.background,
            borderColor: themeVars?.border,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            zIndex: 1,
          }}
        >
          <img src={icon} alt={title} className="w-16 h-16 mb-2" />
          <p>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
