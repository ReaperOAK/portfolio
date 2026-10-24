import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

export default function AnimatedProjectCard({ children }) {
  const { themeVars: t } = useTheme();
  return (
    <motion.div
  initial={{ opacity: 0.98, y: 0 }}
  whileHover={{ boxShadow: `0 16px 48px 0 ${t.primary}22`, y: -6 }}
  whileTap={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '320px',
        boxSizing: 'border-box',
        background: `linear-gradient(135deg, ${t.background} 80%, ${t.subtle} 100%)`,
        border: `2px solid ${t.border}`,
        borderRadius: "1rem",
        boxShadow: `0 2px 16px 0 ${t.primary}11`,
        padding: "1rem",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.div>
  );
}
