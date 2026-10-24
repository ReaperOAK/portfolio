import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProjectMediaCarousel({ screenshots = [] }) {
  const { themeVars } = useTheme();
  const [idx, setIdx] = useState(0);
  if (!Array.isArray(screenshots) || screenshots.length === 0) return null;

  const prev = () => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIdx((i) => (i + 1) % screenshots.length);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative h-48 sm:h-56 md:h-72 lg:h-80"
      style={{ border: `1px solid ${themeVars.primary}10`, background: themeVars.background }}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Project media carousel, slide ${idx + 1} of ${screenshots.length}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }}
    >
      <img
        src={screenshots[idx]}
        alt={`Screenshot ${idx + 1}`}
        className="w-full h-full object-cover block"
        loading="lazy"
        style={{ aspectRatio: '16/9' }}
      />

      {screenshots.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ background: `${themeVars.background}cc`, color: themeVars.primary, border: `1px solid ${themeVars.primary}22` }}
          >
            ◀
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ background: `${themeVars.background}cc`, color: themeVars.primary, border: `1px solid ${themeVars.primary}22` }}
          >
            ▶
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {screenshots.map((s, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Show screenshot ${i + 1}`} className={`w-2 h-2 rounded-full ${i === idx ? 'opacity-100' : 'opacity-40'}`} style={{ background: themeVars.primary }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
