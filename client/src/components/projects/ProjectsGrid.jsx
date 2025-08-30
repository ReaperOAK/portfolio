import React from 'react';

export default function ProjectsGrid({ children, className = '', cols = 'md:grid-cols-2' }) {
  const gridClass = `grid grid-cols-1 ${cols} gap-6 ${className}`.trim();

  return (
    <section aria-label="Projects grid" className={gridClass}>
      {children}
    </section>
  );
}
