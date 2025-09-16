import React, { useRef, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import { useTheme } from "../../contexts/ThemeContext";
import { Code2, Palette, Brain, Rocket } from "lucide-react";

// Status-based filters that map to values found in `client/src/data/projects.js`
const VIEW_MODES = [
  { label: "All", value: "all", icon: <Code2 size={18} /> },
  { label: "Under Development", value: "under development", icon: <Palette size={18} /> },
  { label: "Completed", value: "completed", icon: <Brain size={18} /> },
  { label: "Deployed", value: "deployed", icon: <Rocket size={18} /> },
];

export default function ProjectFilterSwitch({ selected, onSelect }) {
  const { themeVars: t } = useTheme();
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderMax, setSliderMax] = useState(0);

  const updateIndicators = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth, scrollLeft } = el;
    setShowLeft(scrollLeft > 8);
    // small epsilon to account for fractional pixels
    setShowRight(scrollLeft + clientWidth < scrollWidth - 8);
    // update slider state: max is scrollable width; value is current scrollLeft
    const max = Math.max(0, scrollWidth - clientWidth);
    setSliderMax(max);
    setSliderValue(Math.min(max, Math.max(0, scrollLeft)));
  };

  const handleScroll = () => {
    updateIndicators();
  };

  const scrollBy = (amount) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    // update indicators after scroll finishes (approx)
    setTimeout(updateIndicators, 250);
  };

  const onSliderInput = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const val = Number(e.target.value || 0);
    // scroll to the new position
    el.scrollTo({ left: val, behavior: 'smooth' });
    setSliderValue(val);
    // ensure indicators update shortly after
    setTimeout(updateIndicators, 150);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateIndicators();
    const onResize = () => updateIndicators();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Responsive container:
  // - On small screens: fixed at bottom-center with horizontal scrolling when needed
  // - On medium+ screens: fixed at top-right (existing position)
  const node = (
    <div>
      <a href="#maincontent" className="sr-only focus:not-sr-only">Skip to main</a>
      <div
        className="fixed left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 sm:top-20 bottom-6 sm:bottom-auto flex gap-2 items-center px-3 py-2 rounded-xl shadow-lg backdrop-blur-md animate-fade-in max-w-full z-50"
        style={{
          background: `${t.background}cc`,
          border: `1px solid ${t.border}`,
          boxShadow: `0 2px 16px 0 ${t.subtle}`,
          zIndex: 9999,
        }}
      >
        {/* scroll container for small screens */}
        <div className="relative w-full">
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-none max-w-[90vw] sm:max-w-none" style={{ WebkitOverflowScrolling: 'touch' }} onScroll={handleScroll}>
            {VIEW_MODES.map((mode) => (
              <div key={mode.value} className="relative flex-shrink-0">
                <button
                  className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium text-sm transition-all duration-300 focus:outline-none ${selected === mode.value ? "scale-105 font-bold" : "opacity-70"}`}
                  style={{
                    background: selected === mode.value ? t.primary : "transparent",
                    color: selected === mode.value ? t.background : t.primary,
                    border: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => onSelect(mode.value)}
                  aria-pressed={selected === mode.value}
                >
                  {mode.icon}
                  <span className="whitespace-nowrap">{mode.label}</span>
                </button>
              </div>
            ))}
          </div>

          {/* slider control replaces arrows/pulse; visible but disabled when no overflow */}
          <div className="mt-2 px-1">
            <input
              type="range"
              min={0}
              max={sliderMax}
              value={sliderValue}
              onInput={onSliderInput}
              aria-label="Scroll project filters"
              className="w-[calc(100vw-96px)] sm:w-full h-2 bg-transparent appearance-none"
              disabled={sliderMax === 0}
              style={{ accentColor: t.primary }}
            />
            {/* provide visual hint when disabled */}
            {sliderMax === 0 && (
              <div className="text-xs text-center opacity-60 mt-1" style={{ color: t.primary }}>No more filters</div>
            )}
          </div>
        </div>
      </div>
      <style>{`/* hide scrollbar for Webkit */ .scrollbar-none::-webkit-scrollbar { display: none; } .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; } .sr-only:focus:not(:focus-visible) { position: static; width: auto; height: auto; clip: auto; clip-path: none; white-space: normal; }`}</style>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(node, document.body);
  }

  return node;
}
