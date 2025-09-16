import { useTheme } from '../contexts/ThemeContext';
import { useVisitor } from '../contexts/VisitorContext';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, setTheme, themeVars } = useTheme();
  const { visitorType } = useVisitor();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme override toggle
  const handleThemeToggle = () => {
    // Cycle through visitor types for demo; in real use, show a theme picker
    const types = ['recruiter', 'client', 'developer', 'poet'];
    const idx = types.indexOf(theme);
    setTheme(types[(idx + 1) % types.length], true);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-40 shadow-md transition-colors duration-500"
      style={{ background: themeVars.background, color: themeVars.foreground }}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <motion.div
          className="font-extrabold text-2xl tracking-tight flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span role="img" aria-label="logo" className="text-3xl" style={{ color: themeVars.primary }}>
            🦉
          </span>
          <span>Owais</span>
        </motion.div>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors duration-200 px-2 py-1 rounded-lg ${location.pathname === link.to ? 'bg-opacity-20' : ''}`}
              style={{ color: themeVars.foreground, background: location.pathname === link.to ? themeVars.accent : 'transparent' }}
              tabIndex={0}
            >
              {link.label}
            </Link>
          ))}
          {/* Theme toggle */}
          <button
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="ml-2 p-2 rounded-full border border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            style={{ color: themeVars.primary }}
          >
            {theme === 'recruiter' || theme === 'client' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden flex flex-col gap-3 px-4 pb-4 bg-opacity-95"
          style={{ background: themeVars.background, color: themeVars.foreground }}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-medium py-2 px-3 rounded-lg text-left w-full"
              style={{ color: themeVars.foreground, background: location.pathname === link.to ? themeVars.accent : 'transparent' }}
              onClick={() => setMobileOpen(false)}
              tabIndex={0}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="mt-2 p-2 rounded-full border border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            style={{ color: themeVars.primary }}
          >
            {theme === 'recruiter' || theme === 'client' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
