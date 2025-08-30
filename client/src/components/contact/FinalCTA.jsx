import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function FinalCTA() {
  const { themeVars } = useTheme();

  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';
  const gradient = themeVars?.gradient || ['#FB7185', '#C084FC'];

  const handleHireMe = () => {
    window.open('mailto:owais@example.com?subject=Let\'s Work Together!&body=Hi Owais,%0D%0A%0D%0AI\'d like to discuss a project with you.', '_blank');
  };

  return (
    <section className="relative py-20 px-6 text-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${gradient[0]} 0%, ${gradient[1]} 50%, transparent 70%)`
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Dramatic headline */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your move.
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your ideas into digital reality? Let's create something extraordinary together.
          </motion.p>
        </motion.div>

        {/* Glowing Hire Me Button */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-50"
            style={{ 
              background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main button */}
          <motion.button
            onClick={handleHireMe}
            className="relative px-12 py-6 text-2xl font-bold rounded-full transition-all duration-300 transform"
            style={{
              background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
              color: themeVars?.background || '#1C0C2E',
              boxShadow: `0 10px 30px ${primary}40`
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 15px 40px ${primary}60`
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              Hire Me
              <motion.span
                className="ml-3 text-3xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🚀
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="mt-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg opacity-70">
            • Full-stack development • Creative problem solving • 24/7 availability
          </p>
          
          <motion.div
            className="flex items-center justify-center space-x-8 text-sm opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span>✨ 5+ years experience</span>
            <span>🏆 100+ projects delivered</span>
            <span>⚡ Fast response time</span>
          </motion.div>
        </motion.div>

        {/* Social proof or testimonial teaser */}
        <motion.div
          className="mt-16 p-6 rounded-2xl border backdrop-blur-sm"
          style={{ 
            borderColor: `${primary}40`,
            backgroundColor: `${themeVars?.subtle || '#2E1065'}60`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-lg italic mb-4">
            "Working with Owais was like having a tech wizard on our team. The combination of technical expertise and creative vision brought our project to life beyond our expectations."
          </p>
          <div className="flex items-center justify-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <div className="text-left">
              <div className="font-semibold">Sarah Chen</div>
              <div className="text-sm opacity-70">Startup Founder</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
