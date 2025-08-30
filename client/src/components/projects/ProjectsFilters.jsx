import React from 'react';

export default function ProjectsFilters({ selected, onChange, className = '', options = [{ value: 'all', label: 'All' }, { value: 'frontend', label: 'Frontend' }, { value: 'backend', label: 'Backend' }] }) {
  const selectId = 'projects-filter-select';
  return (
    <div className={`mb-4 ${className}`.trim()}>
      {/* Simple filters placeholder */}
      <label htmlFor={selectId} className="mr-2">Filter:</label>
      <select id={selectId} value={selected} onChange={(e) => onChange && onChange(e.target.value)} aria-label="Filter projects">
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}
