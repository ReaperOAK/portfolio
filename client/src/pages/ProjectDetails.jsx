import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import projects from "../data/projects";
import DevLogTrail from "../components/projects/DevLogTrail";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { themeVars } = useTheme();
  const project = projects.find(p => p.slug === slug);

  // If a slug isn't present on the project data, try matching a slugified title
  const slugify = (input = '') =>
    String(input)
      .toLowerCase()
      .trim()
      .replace(/[’'`]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const projectByTitle = !project ? projects.find(p => slugify(p.title) === slug) : project;
  const finalProject = project || projectByTitle;

  if (!finalProject) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ background: themeVars.background, color: themeVars.foreground }}>
        <h2 className="text-2xl font-bold">Project not found</h2>
      </div>
    );
  }
  return (
    <main className="w-full min-h-screen px-4 py-12 md:py-20 flex justify-center" style={{ background: themeVars.background, color: themeVars.foreground }}>
      <article className="max-w-6xl w-full space-y-8">
        {/* Header: stacked hero */}
        <header className="rounded-2xl p-6 md:p-8" style={{ background: themeVars.subtle, border: `1px solid ${themeVars.primary}10` }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-4xl md:text-5xl" style={{ background: `linear-gradient(135deg, ${themeVars.primary}, ${themeVars.accent})`, color: themeVars.background, boxShadow: `0 8px 24px ${themeVars.primary}15`, border: `1px solid ${themeVars.primary}22` }} aria-hidden>
                {finalProject.icon}
              </div>
            </div>

            <div className="flex-1 text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight break-words" style={{ color: themeVars.primary }}>{finalProject.title}</h1>
              <p className="mt-2 text-sm md:text-base" style={{ color: themeVars.foreground, opacity: 0.95 }}>{finalProject.shortDesc}</p>

              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <span className="inline-block text-xs px-3 py-1 rounded-full font-medium" style={{ background: themeVars.accent, color: themeVars.background }}>{finalProject.status}</span>
                <span className="inline-block text-xs px-3 py-1 rounded-full" style={{ background: themeVars.primary, color: themeVars.background }}>{finalProject.type}</span>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                {(finalProject.tech || []).map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs md:text-sm font-mono" style={{ background: themeVars.background, color: themeVars.foreground, border: `1px solid ${themeVars.primary}14` }}>{tech}</span>
                ))}
              </div>

              <div className="mt-5 flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ background: themeVars.background, color: themeVars.primary, border: `1px solid ${themeVars.primary}18` }}
                >
                  ← Back
                </button>

                <a href={finalProject.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md font-medium" style={{ background: themeVars.primary, color: themeVars.background }}>View Code</a>

                {finalProject.live && (
                  <a href={finalProject.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md font-medium" style={{ background: themeVars.accent, color: themeVars.background }}>Live Demo</a>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="rounded-2xl p-6 md:p-8" style={{ background: themeVars.subtle, border: `1px solid ${themeVars.primary}10` }}>
            <h2 className="sr-only">Project overview</h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: themeVars.foreground, opacity: 0.97 }}>{finalProject.desc || finalProject.description}</p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold" style={{ color: themeVars.primary }}>Key decisions</h3>
              <ul className="list-disc ml-5 mt-2" style={{ color: themeVars.foreground, opacity: 0.9 }}>
                {(finalProject.decisions || []).map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold" style={{ color: themeVars.primary }}>Tags & context</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {(finalProject.tags || []).map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: themeVars.accent, color: themeVars.background }}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: themeVars.primary }}>Development Log</h3>
            <div className="rounded-2xl p-4" style={{ background: themeVars.subtle, border: `1px solid ${themeVars.primary}08` }}>
              <DevLogTrail logs={finalProject.devLogs || []} />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
