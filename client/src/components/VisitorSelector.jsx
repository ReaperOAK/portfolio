import { useEffect, useRef } from 'react';
import { useVisitor } from '../contexts/VisitorContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const visitorTypes = [
  { key: 'recruiter', label: 'Recruiter' },
  { key: 'client', label: 'Client' },
  { key: 'developer', label: 'Developer' },
  { key: 'poet', label: 'Creative Soul' },
];

export default function VisitorSelector({ open, onClose }) {
  const { setVisitorType } = useVisitor();
  const { setTheme } = useTheme();
  const modalRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  const handleSelect = (type) => {
    setVisitorType(type);
    setTheme(type, false); // sync theme to visitor type
    if (onClose) onClose();
  };

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md outline-none"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Who are you?</h2>
            <div className="flex flex-col gap-4">
              {visitorTypes.map((v) => (
                <button
                  key={v.key}
                  onClick={() => handleSelect(v.key)}
                  className="py-3 px-6 rounded-lg font-semibold border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-primary/10 focus:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  aria-label={`Select ${v.label}`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
