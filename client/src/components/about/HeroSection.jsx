import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const roles = ["Developer", "Poet", "Designer", "Engineer", "Creative Soul"];

export default function HeroSection() {
  const { themeVars } = useTheme();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(interval);
  }, []);

  // Fallbacks in case themeVars is not loaded
  const bg = themeVars?.background || "#F8FAFC";
  const fg = themeVars?.foreground || "#0F172A";
  const primary = themeVars?.primary || "#3B82F6";
  const accent = themeVars?.accent || "#10B981";
  const gradient = themeVars?.gradient || ["#3B82F6", "#10B981"];

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full min-h-[420px] py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated theme gradient glow */}
      <div
        className="w-40 h-40 rounded-full blur-3xl absolute -z-10 left-0 top-0 opacity-30 animate-pulse"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
        aria-hidden="true"
      />
      <div className="flex flex-col items-center">
        {/* Avatar (profile image, theme border/shadow) */}
        <div
          className="w-28 h-28 rounded-full border-4 shadow-lg overflow-hidden flex items-center justify-center"
          style={{ borderColor: accent, background: bg }}
          aria-label="Owais Khan avatar"
        >
          <img
            src="/profile.png"
            alt="Owais Khan profile"
            className="w-full h-full object-cover rounded-full select-none"
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Animated role switcher (theme color) */}
        <div
          className="h-8 text-lg font-mono min-w-[160px] flex items-center justify-center mt-2"
          style={{ color: primary }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={roles[roleIdx]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="block"
              aria-live="polite"
            >
              {roles[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
        <h1 className="text-3xl font-extrabold mt-4 mb-1 tracking-tight text-center" style={{ color: fg }}>Owais Khan</h1>
        <p className="text-lg mb-3 max-w-md text-center" style={{ color: accent }}>
          Engineer by logic, poet by soul.
        </p>
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: primary + '22', color: primary }}>MERN</span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: accent + '22', color: accent }}>Firebase</span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: fg + '22', color: fg }}>Framer Motion</span>
        </div>
      </div>
    </motion.div>
  );
}