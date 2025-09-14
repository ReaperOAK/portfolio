import React, { useState } from "react";
import ProjectTile from "./ProjectTile";
import AnimatedProjectCard from "./AnimatedProjectCard";
import { useTheme } from "../../contexts/ThemeContext";
import projectsData from "../../data/projects";
import { motion, AnimatePresence } from "framer-motion";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function WorkbenchGrid({ viewMode }) {
  const { themeVars } = useTheme();
  const [projects, setProjects] = useState(Array.isArray(projectsData) ? projectsData : []);
  const [activeIdx, setActiveIdx] = useState(null);

  // map viewMode to filtering predicate
  const filterProjects = (list, mode) => {
    if (!mode || mode === 'all') return list;

    const codeTech = new Set(['Node.js', 'Express', 'PostgreSQL', 'MySQL', 'MongoDB', 'Next.js', 'Django', 'Flask']);
    const uiTech = new Set(['Tailwind', 'Framer Motion', 'React Three Fiber', 'React', 'Svelte', 'Vue.js', 'Angular']);
    const rdTech = new Set(['React Three Fiber', 'Socket.IO', 'Mapbox', 'Three.js', 'Framer Motion', 'Socket.IO']);

    return list.filter((p) => {
      const tech = Array.isArray(p.tech) ? p.tech.map(t => String(t)) : [];
      const tags = Array.isArray(p.tags) ? p.tags.map(t => String(t)) : [];
      const status = String(p.status || '').toLowerCase();
      switch (mode) {
        case 'code':
          return tech.some(t => codeTech.has(t)) || tags.some(t => ['CRM','Client','Backend','API'].includes(t));
        case 'ui':
          return tech.some(t => uiTech.has(t)) || tags.some(t => ['UI','Design'].includes(t));
        case 'rd':
          return tech.some(t => rdTech.has(t)) || tags.some(t => ['3D','Visualization','Realtime'].includes(t));
        case 'deployed':
          return Boolean(p.live) || status.includes('deployed');
        default:
          return true;
      }
    });
  };

  const filteredProjects = filterProjects(projects, viewMode);

  // Shuffle button for random rearrangement
  const handleShuffle = () => {
    setProjects(shuffleArray(projects));
    setActiveIdx(null);
  };

  // no drag-and-drop — simplified static workbench
  const onDragEnd = () => {};

  return (
    <section
      className="w-full max-w-6xl mx-auto relative flex flex-col items-center"
      style={{
        background: 'transparent',
        padding: "3.5rem 1.5rem 2.5rem 1.5rem",
        borderRadius: "2.5rem",
        boxShadow: 'none',
        minHeight: "700px",
        overflow: "visible",
        position: "relative",
        border: 'none',
      }}
    >
      {/* Shuffle button moved to bottom-right */}
      <button
        type="button"
        aria-label="Shuffle workbench"
        className="absolute bottom-6 right-6 px-4 py-2 rounded-full font-semibold shadow transition-all duration-300 hover:scale-105 z-30"
        style={{ background: themeVars.primary, color: themeVars.background }}
        onClick={handleShuffle}
      >
        Shuffle Workbench
      </button>
  {/* SkillMapOverlay removed — overlay visuals disabled for cleaner grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12" style={{ color: themeVars.foreground }}>
              No projects match this filter.
            </div>
          )}
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.slug || project.title || idx}
              layout
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              style={{ zIndex: activeIdx === idx ? 2 : 1, height: '100%' }}
            >
              <AnimatedProjectCard docked={true} active={activeIdx === idx}>
                <ProjectTile project={project} allProjects={projects} />
              </AnimatedProjectCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
