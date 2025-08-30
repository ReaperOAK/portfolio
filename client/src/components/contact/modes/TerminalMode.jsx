import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = {
  help: {
    description: 'Show available commands',
    action: () => `Available commands:
• help     - Show this help message
• email    - Open email client
• linkedin - Open LinkedIn profile  
• github   - Open GitHub profile
• resume   - Download resume
• poetry   - Random poem generator
• clear    - Clear terminal
• exit     - Return to conversational mode`
  },
  email: {
    description: 'Open email client',
    action: () => {
      window.open('mailto:owais@example.com', '_blank');
      return 'Opening email client...';
    }
  },
  linkedin: {
    description: 'Open LinkedIn profile',
    action: () => {
      window.open('https://linkedin.com/in/owais', '_blank');
      return 'Opening LinkedIn profile...';
    }
  },
  github: {
    description: 'Open GitHub profile',
    action: () => {
      window.open('https://github.com/ReaperOAK', '_blank');
      return 'Opening GitHub profile...';
    }
  },
  resume: {
    description: 'Download resume',
    action: () => {
      // Simulate resume download
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Owais_Khan_Resume.pdf';
      link.click();
      return 'Downloading resume...';
    }
  },
  poetry: {
    description: 'Generate random poem',
    action: () => {
      const poems = [
        `In lines of code, dreams take flight,
Algorithms dance through the night,
Bugs and features intertwine,
In this digital world of mine.`,
        `Variables store our deepest thoughts,
Functions execute what time has wrought,
In loops eternal, logic flows,
As elegant solution grows.`,
        `Pixels paint the user's story,
Responsive design in all its glory,
From server-side to client-bright,
Code illuminates the night.`
      ];
      return poems[Math.floor(Math.random() * poems.length)];
    }
  },
  clear: {
    description: 'Clear terminal',
    action: () => 'CLEAR'
  }
};

export default function TerminalMode() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Owais Terminal v2.0.1' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'prompt', content: '$ ' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Typewriter effect for initial messages
  useEffect(() => {
    if (currentIndex < 2) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command to display
    setHistory(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);

    if (trimmedCmd === 'exit') {
      setHistory(prev => [...prev, 
        { type: 'output', content: 'Exiting terminal mode...' },
        { type: 'system', content: 'Goodbye! 👋' }
      ]);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('switchToConversational'));
      }, 1500);
      return;
    }

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd].action();
      if (result === 'CLEAR') {
        setHistory([
          { type: 'system', content: 'Terminal cleared.' },
          { type: 'prompt', content: '$ ' }
        ]);
      } else {
        setHistory(prev => [...prev, 
          { type: 'output', content: result },
          { type: 'prompt', content: '$ ' }
        ]);
      }
    } else {
      setHistory(prev => [...prev, 
        { type: 'error', content: `Command not found: ${trimmedCmd}. Type "help" for available commands.` },
        { type: 'prompt', content: '$ ' }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        className="bg-black rounded-lg overflow-hidden border border-green-500 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-green-500">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-green-400 text-sm font-medium">
            owais@portfolio:~$
          </div>
          <div className="w-20"></div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 bg-black text-green-400"
          onClick={() => inputRef.current?.focus()}
        >
          <AnimatePresence>
            {history.slice(0, currentIndex + 1).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`mb-1 ${
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'system' ? 'text-blue-400' :
                  line.type === 'command' ? 'text-yellow-400' :
                  line.type === 'output' ? 'text-green-300' :
                  'text-green-400'
                }`}
              >
                {line.type === 'output' && line.content.includes('\n') ? (
                  <pre className="whitespace-pre-wrap">{line.content}</pre>
                ) : (
                  <span>{line.content}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          {currentIndex >= 2 && (
            <motion.form
              onSubmit={handleSubmit}
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <span className="text-green-400 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
                style={{ fontFamily: 'inherit' }}
                placeholder=""
                autoComplete="off"
                spellCheck="false"
              />
              <motion.span
                className="w-2 h-5 bg-green-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.form>
          )}
        </div>

        {/* Quick Commands */}
        <div className="px-4 py-3 bg-gray-900 border-t border-green-500">
          <div className="text-green-400 text-xs mb-2">Quick Commands:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(commands).slice(0, 6).map(([cmd, info]) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  executeCommand(cmd);
                  setInput('');
                }}
                className="px-2 py-1 text-xs bg-green-900 text-green-300 rounded hover:bg-green-800 transition-colors"
                title={info.description}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Help Text */}
      <motion.div
        className="text-center mt-6 text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p>Use arrow keys to navigate command history • Type "exit" to return to conversational mode</p>
      </motion.div>
    </div>
  );
}
