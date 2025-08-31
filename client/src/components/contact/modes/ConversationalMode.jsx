import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const conversations = {
  start: {
    message: "Hey 👋 who are you?",
    options: [
      { text: "Recruiter", next: "recruiter" },
      { text: "Collaborator", next: "collaborator" },
      { text: "Just Browsing", next: "browsing" }
    ]
  },
  recruiter: {
    message: "Looking for a full-stack dev, frontend specialist, or something else?",
    options: [
      { text: "Full-Stack Developer", next: "contact" },
      { text: "Frontend Specialist", next: "contact" },
      { text: "Backend Engineer", next: "contact" },
      { text: "Something Else", next: "contact" }
    ]
  },
  collaborator: {
    message: "Hackathons, open source, or passion project?",
    options: [
      { text: "Hackathon Partner", next: "contact" },
      { text: "Open Source", next: "contact" },
      { text: "Passion Project", next: "contact" },
      { text: "Startup Idea", next: "contact" }
    ]
  },
  browsing: {
    message: "Want to just say hi?",
    options: [
      { text: "Say Hello", next: "contact" },
      { text: "Ask a Question", next: "contact" },
      { text: "Share Feedback", next: "contact" }
    ]
  }
};

export default function ConversationalMode() {
  const { themeVars } = useTheme();
  const [currentStep, setCurrentStep] = useState('start');
  const [selectedPath, setSelectedPath] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const optionRefs = useRef([]);
  const [focusedOption, setFocusedOption] = useState(0);
  const messageRef = useRef(null);
  const formEmailRef = useRef(null);
  const [errors, setErrors] = useState({ email: '', message: '' });

  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';
  const subtle = themeVars?.subtle || '#2E1065';
  const gradient = themeVars?.gradient || ['#FB7185', '#C084FC'];

  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations[currentStep];

  // Typewriter effect with smart pauses
  useEffect(() => {
    if (currentConversation && !showContactForm) {
      setIsTyping(true);
      setDisplayedMessage('');
      let i = 0;
      const message = currentConversation.message;
      let timer = null;

      const tick = () => {
        const nextChar = message.charAt(i);
        setDisplayedMessage(message.slice(0, i + 1));
        i++;
        if (i >= message.length) {
          setIsTyping(false);
          return;
        }
        const pause = /[.,!?]/.test(nextChar) ? 160 : 28;
        timer = setTimeout(tick, pause);
      };

      timer = setTimeout(tick, 200);
      return () => clearTimeout(timer);
    }
  }, [currentStep, currentConversation, showContactForm]);

  const handleOptionClick = (option) => {
    const newPath = [...selectedPath, option.text];
    setSelectedPath(newPath);

    if (option.next === 'contact') {
      setShowContactForm(true);
      // focus the first input once form appears
      setTimeout(() => formEmailRef.current?.focus(), 300);
    } else {
      setCurrentStep(option.next);
      // reset focused option
      setFocusedOption(0);
    }
  };

  // keyboard navigation for options (roving tabindex)
  const handleOptionKeyDown = useCallback((e, idx, option) => {
    const len = (currentConversation?.options?.length || 0);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % len;
      setFocusedOption(next);
      optionRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + len) % len;
      setFocusedOption(prev);
      optionRefs.current[prev]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionClick(option);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      resetConversation();
    }
  }, [currentConversation, selectedPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // basic validation
    const nextErrors = { email: '', message: '' };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message || formData.message.trim().length < 6) {
      nextErrors.message = 'Please enter a brief message (6+ characters).';
    }
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.message) {
      setIsSubmitting(false);
      // focus first error field
      if (nextErrors.email) formEmailRef.current?.focus();
      return;
    }

    try {
      // Call the actual API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${selectedPath.join(' → ')}`,
          website: '', // Honeypot field
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ 
        email: '', 
        message: error.message || 'Failed to send message. Please try again later.' 
      });
      setIsSubmitting(false);
    }
  };

  const resetConversation = () => {
    setCurrentStep('start');
    setSelectedPath([]);
    setShowContactForm(false);
    setFormData({ email: '', message: '' });
    setSubmitted(false);
    setErrors({ email: '', message: '' });
    setFocusedOption(0);
    // restore focus to start
    setTimeout(() => optionRefs.current[0]?.focus(), 200);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-6xl mb-6"
          role="img"
          aria-label="message sent"
          animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 0.9, repeat: 2 }}
        >
          💌
        </motion.div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: primary }}>
          Message Sent Successfully!
        </h3>
        <p className="text-lg opacity-80 mb-8">
          Thanks for reaching out! I'll get back to you soon.
        </p>
        <motion.button
          onClick={resetConversation}
          className="px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300"
          style={{ borderColor: primary, color: primary }}
          whileHover={{ backgroundColor: primary, color: themeVars?.background }}
        >
          Start New Conversation
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" id="conversational-mode">
      <a href="#maincontent" className="sr-only" style={{ position: 'absolute', left: -9999 }}>Skip to conversation</a>
      {/* Conversation Flow */}
      <AnimatePresence mode="wait">
        {!showContactForm ? (
          <motion.div
            key={currentStep}
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Conversation Message */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                ref={messageRef}
                id="maincontent"
                role="region"
                aria-live="polite"
                aria-atomic="true"
                className="inline-block text-left mx-auto max-w-3xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {displayedMessage}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-1 ml-1"
                      style={{ backgroundColor: primary }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  )}
                </h2>
                <div className="mt-2 text-sm opacity-70">
                  <strong style={{ color: accent }}>Tip:</strong> Use arrow keys to navigate options, Enter to select, Esc to reset.
                </div>
              </div>
            </motion.div>

            {/* Options */}
            {!isTyping && currentConversation && (
              <motion.div
                className="grid gap-4 md:grid-cols-2 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                role="listbox"
                aria-label="Conversation options"
              >
                {currentConversation.options.map((option, index) => (
                  <motion.button
                    key={option.text}
                    ref={el => optionRefs.current[index] = el}
                    onClick={() => handleOptionClick(option)}
                    onKeyDown={(e) => handleOptionKeyDown(e, index, option)}
                    className="p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                    style={{
                      borderColor: `${primary}40`,
                      backgroundColor: `${subtle}60`,
                      boxShadow: focusedOption === index ? `0 6px 20px ${primary}20` : 'none'
                    }}
                    whileHover={{
                      borderColor: primary,
                      backgroundColor: `${primary}20`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.06 }}
                    tabIndex={focusedOption === index ? 0 : -1}
                    aria-selected={false}
                    role="option"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-sm opacity-60">→</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Path breadcrumb and progress */}
            {selectedPath.length > 0 && (
              <motion.div
                className="mt-8 text-sm opacity-80 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2" aria-hidden>
                  {selectedPath.map((s, i) => (
                    <div key={i} className="px-3 py-1 rounded-full bg-white/6 text-xs" style={{ border: `1px solid ${primary}22` }}>{s}</div>
                  ))}
                </div>
                <div className="opacity-60">({selectedPath.length} step{selectedPath.length > 1 ? 's' : ''})</div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Contact Form */
          <motion.div
            key="contact-form"
            className="py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8" id="contact-form-heading">
              Let's make it happen! 🚀
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="contact-form-heading">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: primary }}>
                  Your Email
                </label>
                <input
                  id="email"
                  ref={formEmailRef}
                  type="email"
                  required
                  aria-required
                  aria-invalid={errors.email ? true : false}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-4 rounded-lg border-2 bg-transparent transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: `${primary}40`,
                    color: themeVars?.foreground
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && <div id="email-error" className="text-sm text-red-400 mt-2" role="alert">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: primary }}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  aria-required
                  aria-invalid={errors.message ? true : false}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full p-4 rounded-lg border-2 bg-transparent transition-all duration-300 focus:outline-none resize-none"
                  style={{
                    borderColor: `${primary}40`,
                    color: themeVars?.foreground
                  }}
                  placeholder="Tell me about your project, idea, or just say hello!"
                />
                {errors.message && <div id="message-error" className="text-sm text-red-400 mt-2" role="alert">{errors.message}</div>}
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={resetConversation}
                  className="px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300"
                  style={{ borderColor: `${primary}60`, color: `${primary}60` }}
                  whileHover={{ borderColor: primary, color: primary }}
                >
                  Start Over
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: primary,
                    color: themeVars?.background
                  }}
                  whileHover={{
                    boxShadow: `0 0 20px ${primary}60`
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    'Send Message 🚀'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
