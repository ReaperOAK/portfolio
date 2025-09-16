
import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { useSEO, SEOHead, seoConfigs } from '../hooks/useSEO.jsx';
import WorkbenchGrid from "../components/projects/WorkbenchGrid";
import ProjectFilterSwitch from "../components/projects/ProjectFilterSwitch";

export default function Projects() {
  const [selectedViewMode, setSelectedViewMode] = useState("all");
  const { theme, themeVars } = useTheme();
  
  // SEO configuration
  const seoConfig = useSEO(seoConfigs.projects);

  const gridBg = `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="40" height="40" fill="none"/><rect x="0.5" y="0.5" width="39" height="39" rx="12" fill="none" stroke="${encodeURIComponent(themeVars.primary)}" stroke-opacity="0.18"/><line x1="0" y1="20" x2="40" y2="20" stroke="${encodeURIComponent(themeVars.accent)}" stroke-opacity="0.10"/><line x1="20" y1="0" x2="20" y2="40" stroke="${encodeURIComponent(themeVars.accent)}" stroke-opacity="0.10"/></svg>')`;

  return (
    <>
      <SEOHead config={seoConfig} />
      <div
        data-theme={theme}
        style={{ background: themeVars.background, color: themeVars.foreground, minHeight: "100vh", width: "100%" ,backgroundImage: gridBg,
          backgroundSize: "40px 40px",
          backgroundRepeat: "repeat",}}
      >
        <div className="max-w-6xl mx-auto px-4 mt-24 mb-24">
          <h1 className="text-4xl font-display font-bold mb-4 text-center">Projects</h1>
          {/* Filter switch is portaled to document.body; no wrapper needed here */}
          <ProjectFilterSwitch selected={selectedViewMode} onSelect={setSelectedViewMode} />
          <WorkbenchGrid viewMode={selectedViewMode} />
        </div>
      </div>
    </>
  );
}
