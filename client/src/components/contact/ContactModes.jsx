import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import ConversationalMode from './modes/ConversationalMode';
import TerminalMode from './modes/TerminalMode';

const modes = [
  { id: 'conversational', label: 'Conversational', icon: '🗨️' },
  { id: 'terminal', label: 'Terminal', icon: '💻' }
];

export default function ContactModes({ currentMode, setCurrentMode }) {
  const { themeVars } = useTheme();

  // Listen for terminal exit event
  useEffect(() => {
    const handleTerminalExit = () => {
      setTimeout(() => {
        setCurrentMode('conversational');
      }, 1500);
    };

    window.addEventListener('switchToConversational', handleTerminalExit);
    return () => window.removeEventListener('switchToConversational', handleTerminalExit);
  }, [setCurrentMode]);

  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';
  const bg = themeVars?.background || '#1C0C2E';
  const subtle = themeVars?.subtle || '#2E1065';

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Mode Selector */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="flex p-2 rounded-2xl border backdrop-blur-sm flex-wrap"
            style={{ 
              backgroundColor: `${subtle}80`,
              borderColor: `${primary}40`
            }}
          >
            {modes.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentMode === mode.id ? 'text-white' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: currentMode === mode.id ? primary : 'transparent',
                  color: currentMode === mode.id ? bg : themeVars?.foreground
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{mode.icon}</span>
                <span>{mode.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Mode Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentMode === 'conversational' && (
              <motion.div
                key="conversational"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <ConversationalMode />
              </motion.div>
            )}

            {currentMode === 'portal' && (
              <motion.div
                key="portal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <PortalMode />
              </motion.div>
            )}

            {currentMode === 'terminal' && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TerminalMode />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
