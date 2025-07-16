
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import {story} from "../../data/story";


// Timeline data


export default function StorySection() {
  const { themeVars } = useTheme();
  const borderColor = themeVars?.border || "#334155";
  const foreground = themeVars?.foreground || "#0F172A";
  const subtleText = themeVars?.subtle || "#E2E8F0";
  const accent = themeVars?.accent || "#10B981";
  const primary = themeVars?.primary || "#3B82F6";

  return (
    <SectionWrapper>
      <blockquote className="text-xl font-serif mb-6 text-center mx-auto" style={{ color: primary }}>
        "Every journey is a mosaic of small moments—curiosity, setbacks, breakthroughs, and growth."
      </blockquote>
      <ol className="relative border-l mx-auto max-w-xl" style={{ borderColor }}>
        {story.map((step) => (
          <li key={step.year} className="mb-8 ml-8 relative">
            <span
              className="absolute -left-8 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-base shadow"
              style={{
                background: themeVars?.[step.colorKey] || primary,
                boxShadow: `0 0 0 3px ${borderColor}`,
              }}
            >
              {step.year}
            </span>
            <span className="font-semibold ml-4" style={{ color: themeVars?.secondary }}>
              {step.title}
            </span>
            <span className="ml-4 block" style={{ color: foreground }}>
              {step.desc}
            </span>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
