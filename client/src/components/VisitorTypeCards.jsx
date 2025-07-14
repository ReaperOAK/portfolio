import React from 'react';
import { useVisitor } from '../contexts/VisitorContext';
import { motion } from 'framer-motion';
import { User, Briefcase, Code, PenTool } from 'lucide-react';

const visitorTypes = [
  {
    key: 'recruiter',
    label: 'Recruiter',
    desc: 'Looking to hire or collaborate',
    icon: <Briefcase size={32} />,
  },
  {
    key: 'client',
    label: 'Client',
    desc: 'Seeking a solution or service',
    icon: <User size={32} />,
  },
  {
    key: 'developer',
    label: 'Developer',
    desc: 'Interested in code, projects, or open source',
    icon: <Code size={32} />,
  },
  {
    key: 'poet',
    label: 'Creative Soul',
    desc: 'Here for writing, poetry, or inspiration',
    icon: <PenTool size={32} />,
  },
];

export default function VisitorTypeCards() {
  const { setVisitorType } = useVisitor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8 w-full max-w-5xl px-4">
      {visitorTypes.map((type, i) => (
        <motion.button
          key={type.key}
          className="group bg-white/10 border border-transparent hover:border-primary rounded-xl p-6 flex flex-col items-center shadow-lg backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-primary"
          whileHover={{ scale: 1.07, rotate: -2 + i * 1.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setVisitorType(type.key)}
          aria-label={`I am a ${type.label}`}
        >
          <span className="mb-2 text-primary group-hover:scale-110 transition-transform">{type.icon}</span>
          <span className="font-bold text-lg mb-1">{type.label}</span>
          <span className="text-sm opacity-80 text-center">{type.desc}</span>
        </motion.button>
      ))}
    </div>
  );
}
