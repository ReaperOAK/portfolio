
import { useMemo } from "react";
import { motion } from "framer-motion";


// List of quote pairs
const quotes = [
  ["If you're still here", "you probably felt it too."],
  ["Most visitors click away", "but you're not like most."],
  ["You made it past the code and poetry.", "maybe it's time we talk."],
  ["You stayed.", "That means something."],
  ["Some connections are accidental.", "Others are inevitable."]
];

export default function EpiphanyCTA() {
  // Pick a random quote pair on mount
  const [line1, line2] = useMemo(() => {
    const idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx];
  }, []);

  return (
  <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-2xl px-4"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-2xl md:text-4xl font-light italic text-slate-300"
        >
          {line1}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-2 text-lg md:text-2xl text-slate-400"
        >
          {line2}
        </motion.h3>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.6 }}
            className="mt-8"
          >
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white border-2 border-fuchsia-600 shadow-2xl shadow-fuchsia-900/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 relative overflow-hidden"
              style={{
                boxShadow: "0 0 32px 4px rgba(236,72,153,0.25), 0 0 0 2px #a21caf inset",
                animation: "ominousPulse 2.8s infinite cubic-bezier(.4,0,.6,1)",
              }}
            >
              <span className="relative z-10">Let’s Create Something Memorable</span>
              {/* Glowing aura */}
              <span className="absolute inset-0 rounded-full pointer-events-none" style={{
                boxShadow: "0 0 32px 8px #a21caf55, 0 0 0 2px #a21caf inset"
              }} />
            </a>
            {/* Ominous pulse keyframes */}
            <style>{`
              @keyframes ominousPulse {
                0%, 100% { box-shadow: 0 0 32px 4px rgba(236,72,153,0.25), 0 0 0 2px #a21caf inset; }
                50% { box-shadow: 0 0 48px 12px #a21caf99, 0 0 0 2px #a21caf inset; }
              }
            `}</style>
          </motion.div>
      </motion.div>
    </section>
  );
}
