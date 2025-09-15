import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import HireButton from './HireButton';
import Testimonial from './Testimonial';
import useTestimonials from '../../hooks/useTestimonials';

export default function FinalCTA() {
  const { themeVars } = useTheme();

  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';
  const gradient = themeVars?.gradient || ['#FB7185', '#C084FC'];

  // use testimonials hook (rotation + controls)
  const { reviewsList, current, prev, next } = useTestimonials();

  const handleHireMe = () => {
    window.open('mailto:oaak78692@gmail.com?subject=Let\'s Work Together!&body=Hi Owais,%0D%0A%0D%0AI\'d like to discuss a project with you.', '_blank');
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
        <HireButton gradient={gradient} themeBg={themeVars?.background || '#1C0C2E'} primary={primary} onClick={handleHireMe} />

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

        {/* Social proof or testimonial teaser (uses data/review.js) */}
        <motion.div
          className="mt-16 p-6 rounded-2xl border backdrop-blur-sm relative overflow-hidden"
          style={{ 
            borderColor: `${primary}40`,
            backgroundColor: `${themeVars?.subtle || '#2E1065'}60`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          role="region"
          aria-label="Testimonials"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
          }}
        >
          {/* Left arrow (middle-left) */}
          <button
            type="button"
            aria-label="Previous testimonial"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/10 hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2 z-20"
            onClick={prev}
          >
            ‹
          </button>

          {/* Right arrow (middle-right) */}
          <button
            type="button"
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/10 hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2 z-20"
            onClick={next}
          >
            ›
          </button>

          <div className="px-8 py-6">
            <Testimonial review={reviewsList[current]} accent={accent} />
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex items-center justify-center space-x-2" role="tablist" aria-label="Testimonial navigation">
            {reviewsList.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-controls={`testimonial-${i}`}
                tabIndex={0}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white' : 'bg-white/30'}`}
                title={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
