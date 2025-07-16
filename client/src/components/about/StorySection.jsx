
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";


// Timeline data
const steps = [
  {
    year: "2020",
    title: "First Lines of Code",
    desc: "Learnt JavaScript and fell in love with the web.",
    colorKey: "primary"
  },
  {
    year: "2022",
    title: "MERN & Freelance",
    desc: "Built MERN stack projects, started freelancing, and shipped real tools.",
    colorKey: "accent"
  },
  {
    year: "2025",
    title: "Creative Builder",
    desc: "Blending code with poetry, building creative products.",
    colorKey: "highlight"
  }
];

export default function StorySection() {
  const { themeVars } = useTheme();
  const borderColor = themeVars?.border || "#334155";
  const textColor = themeVars?.foreground || "#0F172A";
  const subtleText = themeVars?.subtle || "#E2E8F0";
  const accent = themeVars?.accent || "#10B981";

  return (
    <SectionWrapper>
      <blockquote
        className="text-2xl font-serif mb-10 text-center max-w-2xl mx-auto"
        style={{ color: subtleText }}
      >
        “From Fathehpur to frontend, I discovered shayari and syntax around the same time.”
      </blockquote>
      <motion.ol
        className="relative border-l mx-auto max-w-2xl"
        style={{ borderColor }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {steps.map((step, i) => (
          <motion.li
            key={step.year}
            className="mb-12 ml-8 flex flex-col gap-1 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <span
              className={"absolute -left-8 flex items-center justify-center w-8 h-8 rounded-full ring-8 text-white font-bold text-lg shadow-lg"}
              style={{
                background: themeVars?.[step.colorKey] || themeVars.primary,
                borderColor: accent,
                boxShadow: `0 0 0 4px ${borderColor}`
              }}
            >
              {step.year}
            </span>
            <span className="font-semibold text-lg ml-4" style={{ color: textColor }}>{step.title}</span>
            <span className="text-base leading-7 ml-4 max-w-prose" style={{ color: subtleText }}>{step.desc}</span>
          </motion.li>
        ))}
      </motion.ol>
    </SectionWrapper>
  );
}
