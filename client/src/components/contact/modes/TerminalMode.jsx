import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = {
  help: {
    description: 'Show available commands',
    action: (ctx) => {
      // Build the help string dynamically so it's always up-to-date
      return Object.entries(ctx.commands)
        .map(([k, v]) => `${k.padEnd(9)} - ${v.description}`)
        .join('\n');
    }
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
        `In lines of code, dreams take flight,\nAlgorithms dance through the night,\nBugs and features intertwine,\nIn this digital world of mine.`,
        `Variables store our deepest thoughts,\nFunctions execute what time has wrought,\nIn loops eternal, logic flows,\nAs elegant solution grows.`,
        `Pixels paint the user's story,\nResponsive design in all its glory,\nFrom server-side to client-bright,\nCode illuminates the night.`
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
  const [commandHistory, setCommandHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('terminal:commandHistory');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [persistenceEnabled, setPersistenceEnabled] = useState(() => {
    try { return !!localStorage.getItem('terminal:commandHistory'); } catch { return false; }
  });
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 => not browsing history
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [typingOutputId, setTypingOutputId] = useState(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

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

  // Persist command history
  useEffect(() => {
    try {
      if (persistenceEnabled) localStorage.setItem('terminal:commandHistory', JSON.stringify(commandHistory));
    } catch {}
  }, [commandHistory]);

  const executeCommand = (cmd) => {
    const trimmedCmd = (cmd || '').trim();
    if (trimmedCmd === '') return;

    const lowered = trimmedCmd.toLowerCase();

    // Save to persistent command history
  setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

  // close suggestions whenever a command runs
  setSuggestionsOpen(false);

    // Add command line to display
    setHistory(prev => [...prev, { type: 'command', content: `$ ${trimmedCmd}` }]);

    // Handle special exit
    if (lowered === 'exit') {
      setHistory(prev => [...prev,
        { type: 'output', content: 'Exiting terminal mode...' },
        { type: 'system', content: 'Goodbye! 👋' }
      ]);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('switchToConversational'));
      }, 1200);
      return;
    }

    // Known commands
    if (commands[lowered]) {
      // If action returns text, animate typing it into the terminal for realism
      const result = commands[lowered].action({ commands });
      if (result === 'CLEAR') {
        setHistory([
          { type: 'system', content: 'Terminal cleared.' },
          { type: 'prompt', content: '$ ' }
        ]);
        return;
      }

      // Animate output text
      const id = Date.now().toString();
      setTypingOutputId(id);
      setHistory(prev => [...prev, { id, type: 'output', content: '' }, { type: 'prompt', content: '$ ' }]);

      // type text slowly
      let pos = 0;
      const text = String(result);
      clearInterval(typingTimer.current);
      typingTimer.current = setInterval(() => {
        pos += Math.max(1, Math.floor(text.length / 30));
        const chunk = text.slice(0, pos);
        setHistory(prev => {
          // replace the last output with same id
          const copy = prev.slice();
          const idx = copy.findIndex(h => h.id === id);
          if (idx !== -1) copy[idx] = { ...copy[idx], content: chunk };
          return copy;
        });
        if (pos >= text.length) {
          clearInterval(typingTimer.current);
          setTypingOutputId(null);
        }
      }, 16);

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
    // ArrowUp / ArrowDown navigate saved commandHistory (most recent last)
    if (e.key === 'ArrowUp') {
      if (commandHistory.length === 0) return;
      e.preventDefault();
      const newIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInput(commandHistory[newIdx]);
      setSuggestionsOpen(false);
    } else if (e.key === 'ArrowDown') {
      if (historyIndex === -1) return;
      e.preventDefault();
      if (historyIndex === commandHistory.length - 1) {
        setHistoryIndex(-1);
        setInput('');
        setSuggestionsOpen(false);
      } else {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setInput(commandHistory[newIdx]);
      }
    } else if (e.key === 'Tab') {
      // Autocomplete with Tab
      e.preventDefault();
      const prefix = input.trim().toLowerCase();
      if (!prefix) return;
      const matches = Object.keys(commands).filter(c => c.startsWith(prefix));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        // show suggestions briefly
        setSuggestionsOpen(true);
      }
    }
  };

  const clearHistory = useCallback(() => {
    setHistory([
      { type: 'system', content: 'Welcome to Owais Terminal v2.0.1' },
      { type: 'system', content: 'Type "help" for available commands.' },
      { type: 'prompt', content: '$ ' }
    ]);
    // show the prompt/input immediately
    setCurrentIndex(2);
  }, []);

  const filteredSuggestions = useMemo(() => {
    const prefix = input.trim().toLowerCase();
    if (!prefix) return [];
    return Object.keys(commands).filter(c => c.startsWith(prefix));
  }, [input]);

  const handleSuggestionClick = (cmd) => {
    setInput(cmd);
    setSuggestionsOpen(false);
    // execute on click for faster flow
    executeCommand(cmd);
    setInput('');
  };

  const copyToClipboard = async (text) => {
    try { await navigator.clipboard.writeText(text); }
    catch { /* ignore */ }
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
          role="log"
          aria-live="polite"
        >
          <AnimatePresence>
            {(currentIndex < 2 ? history.slice(0, currentIndex + 1) : history).map((line, index) => (
              <motion.div
                key={line.id ?? index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`mb-1 ${
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'system' ? 'text-blue-400' :
                  line.type === 'command' ? 'text-yellow-400' :
                  line.type === 'output' ? 'text-green-300' :
                  'text-green-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    {line.type === 'output' && String(line.content).includes('\n') ? (
                      <pre className="whitespace-pre-wrap break-words">{line.content}</pre>
                    ) : (
                      <span className="select-text">{line.content}</span>
                    )}
                  </div>
                  {/* copy button for outputs */}
                  {line.type === 'output' && line.content && (
                    <button
                      aria-label="Copy output"
                      title="Copy output"
                      onClick={() => copyToClipboard(String(line.content))}
                      className="ml-2 text-xs px-2 py-1 bg-green-900/30 rounded text-green-200 hover:bg-green-800/60"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          {currentIndex >= 2 && (
            <div className="relative mt-2">
              <motion.form
                onSubmit={handleSubmit}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18, delay: 0.15 }}
              >
                <span className="text-green-400 mr-2" aria-hidden>$</span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  aria-label="Terminal command input"
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setSuggestionsOpen(true); setHistoryIndex(-1); }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-green-400 outline-none caret-green-400 placeholder-green-500"
                  style={{ fontFamily: 'inherit' }}
                  placeholder="Try: help, github, poetry, resume"
                  autoComplete="off"
                  spellCheck="false"
                />
                <motion.span
                  className="w-2 h-5 bg-green-400 ml-1 rounded"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => {
                    if (input.trim()) { executeCommand(input); setInput(''); }
                  }}
                  className="ml-3 px-2 py-1 text-xs bg-green-700/40 rounded hover:bg-green-700"
                >
                  Run
                </button>
              </motion.form>

              {/* Suggestions box */}
              {suggestionsOpen && filteredSuggestions.length > 0 && (
                <ul
                  role="listbox"
                  aria-label="command suggestions"
                  className="absolute left-8 right-0 mt-2 bg-gray-900 border border-green-700 rounded shadow-sm max-h-40 overflow-y-auto z-10"
                >
                  {filteredSuggestions.map(s => (
                    <li
                      key={s}
                      role="option"
                      onClick={() => handleSuggestionClick(s)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSuggestionClick(s); }}
                      tabIndex={0}
                      className="px-3 py-2 text-sm text-green-200 hover:bg-green-800/40 cursor-pointer"
                    >
                      <strong className="text-green-100 mr-2">{s}</strong>
                      <span className="text-xs opacity-70">{commands[s].description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Quick Commands */}
        <div className="px-4 py-3 bg-gray-900 border-t border-green-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-green-400 text-xs mb-2">Quick Commands:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(commands).slice(0, 6).map(([cmd, info]) => (
                <button
                  key={cmd}
                  onClick={() => { setInput(cmd); executeCommand(cmd); setInput(''); }}
                  className="px-2 py-1 text-xs bg-green-900 text-green-300 rounded hover:bg-green-800 transition-colors"
                  title={info.description}
                  aria-label={`Run ${cmd}`}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                clearHistory();
                setCommandHistory([]);
                setPersistenceEnabled(false);
                try { localStorage.removeItem('terminal:commandHistory'); } catch {}
              }}
              className="px-2 py-1 text-xs bg-red-800 text-red-200 rounded hover:bg-red-700"
              title="Clear terminal & history"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                setPersistenceEnabled(prev => {
                  const next = !prev;
                  try {
                    if (next) localStorage.setItem('terminal:commandHistory', JSON.stringify(commandHistory));
                    else localStorage.removeItem('terminal:commandHistory');
                  } catch {}
                  return next;
                });
              }}
              className="px-2 py-1 text-xs bg-yellow-800 text-yellow-200 rounded hover:bg-yellow-700"
              title="Toggle persistent history in localStorage"
            >
              Toggle Persistence
            </button>
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
