import { useState, useEffect } from 'react';
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

  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';
  const subtle = themeVars?.subtle || '#2E1065';
  const gradient = themeVars?.gradient || ['#FB7185', '#C084FC'];

  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations[currentStep];

  // Typewriter effect
  useEffect(() => {
    if (currentConversation && !showContactForm) {
      setIsTyping(true);
      setDisplayedMessage('');
      let i = 0;
      const message = currentConversation.message;
      
      const timer = setInterval(() => {
        setDisplayedMessage(message.slice(0, i + 1));
        i++;
        if (i >= message.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [currentStep, currentConversation, showContactForm]);

  const handleOptionClick = (option) => {
    const newPath = [...selectedPath, option.text];
    setSelectedPath(newPath);
    
    if (option.next === 'contact') {
      setShowContactForm(true);
    } else {
      setCurrentStep(option.next);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const resetConversation = () => {
    setCurrentStep('start');
    setSelectedPath([]);
    setShowContactForm(false);
    setFormData({ email: '', message: '' });
    setSubmitted(false);
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
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, repeat: 2 }}
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
    <div className="max-w-2xl mx-auto">
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
            </motion.div>

            {/* Options */}
            {!isTyping && currentConversation && (
              <motion.div
                className="grid gap-4 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {currentConversation.options.map((option, index) => (
                  <motion.button
                    key={option.text}
                    onClick={() => handleOptionClick(option)}
                    className="p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ 
                      borderColor: `${primary}40`,
                      backgroundColor: `${subtle}60`
                    }}
                    whileHover={{ 
                      borderColor: primary,
                      backgroundColor: `${primary}20`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <span className="font-medium">{option.text}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Path breadcrumb */}
            {selectedPath.length > 0 && (
              <motion.div
                className="mt-8 text-sm opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Path: {selectedPath.join(' → ')}
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
            <h2 className="text-3xl font-bold text-center mb-8">
              Let's make it happen! 🚀
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: primary }}>
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-4 rounded-lg border-2 bg-transparent transition-all duration-300 focus:outline-none"
                  style={{ 
                    borderColor: `${primary}40`,
                    color: themeVars?.foreground
                  }}
                  onFocus={(e) => e.target.style.borderColor = primary}
                  onBlur={(e) => e.target.style.borderColor = `${primary}40`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: primary }}>
                  Your Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full p-4 rounded-lg border-2 bg-transparent transition-all duration-300 focus:outline-none resize-none"
                  style={{ 
                    borderColor: `${primary}40`,
                    color: themeVars?.foreground
                  }}
                  onFocus={(e) => e.target.style.borderColor = primary}
                  onBlur={(e) => e.target.style.borderColor = `${primary}40`}
                  placeholder="Tell me about your project, idea, or just say hello!"
                />
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
