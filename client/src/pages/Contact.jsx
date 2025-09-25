import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useSEO, SEOHead, seoConfigs } from '../hooks/useSEO.jsx';
import HeroSection from '../components/contact/HeroSection';
import ContactModes from '../components/contact/ContactModes';
import FinalCTA from '../components/contact/FinalCTA';

export default function Contact() {
  const { themeVars } = useTheme();
  const [currentMode, setCurrentMode] = useState('conversational');
  
  // SEO configuration
  const seoConfig = useSEO(seoConfigs.contact);

  const bg = themeVars?.background || "#1C0C2E";
  const fg = themeVars?.foreground || "#F3E8FF";

  return (
    <>
      <SEOHead config={seoConfig} />
      <motion.div 
        className="min-h-screen w-full relative overflow-hidden"
        style={{ backgroundColor: bg, color: fg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      {/* Background ambient glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${themeVars?.primary || '#C084FC'} 0%, transparent 70%)`
        }}
        />
        
        {/* Hero Section */}
        <HeroSection onEnterContact={() => {
          // set mode first
          setCurrentMode('conversational');

          // then smooth-scroll to the conversational panel and focus its first input
          // poll for the element because mode switch may cause a render delay
          const focusConversation = (attempt = 0) => {
            const container = document.getElementById('conversational-mode');
            const emailInput = document.getElementById('email');
            if (container) {
              container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (emailInput) {
              // small timeout to ensure scroll completes before focus
              setTimeout(() => {
                emailInput.focus();
              }, 300);
              return;
            }
            // retry a few times
            if (attempt < 8) {
              setTimeout(() => focusConversation(attempt + 1), 200);
            }
          };

          focusConversation();
        }} />
        
        {/* Main Contact Interaction Zone */}
        <ContactModes currentMode={currentMode} setCurrentMode={setCurrentMode} />
        
        {/* Final CTA */}
        <FinalCTA />
      </motion.div>
    </>
  );
}
