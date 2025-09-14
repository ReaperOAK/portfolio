import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { themeVars } = useTheme();
  return (
    <footer
      className="w-full py-6 mt-auto text-center transition-colors duration-500"
      style={{ background: themeVars.subtle, color: themeVars.foreground }}
      aria-label="Footer"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <SocialLinks className="mb-2" />
        <div className="text-sm opacity-80">
          &copy; {new Date().getFullYear()} Owais. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
