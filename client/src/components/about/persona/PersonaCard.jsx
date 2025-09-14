import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";


export default function PersonaCard({ icon, title, description, bg }) {
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
            background: bg ? `url(${bg}) center/cover no-repeat` : themeVars?.subtle,
            borderColor: themeVars?.border,
            backfaceVisibility: 'hidden',
            zIndex: 2,
          }}
        >
          <h3
            className="text-xl mt-2 font-semibold relative"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.6), 0 0 2px #fff, 0 0 8px rgba(0,0,0,0.3)",
              WebkitTextStroke: "1px rgba(255,255,255,0.7)",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
            }}
          >
            {title}
          </h3>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border p-4 text-sm"
          style={{
            color: themeVars?.primary,
            background: themeVars?.subtle,
            borderColor: themeVars?.border,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            zIndex: 1,
          }}
        >
          <div className="relative mb-2 flex items-center justify-center">
            {/* White glow behind logo */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              aria-hidden="true"
              style={{
                width: '72px',
                height: '72px',
                background: 'white',
                opacity: 0.85,
                filter: 'blur(10px)',
                zIndex: 0,
              }}
            />
            <img src={icon} alt={title} className="w-16 h-16 relative z-10" loading="lazy" decoding="async" />
          </div>
          <h3 className="text-xl mt-2 font-semibold" style={{ color: themeVars?.primary }}>{title}</h3>
          <p className="text-center" style={{ color: themeVars?.secondary }}>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
