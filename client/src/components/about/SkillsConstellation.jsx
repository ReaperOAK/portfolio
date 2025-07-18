
import { SkillCanvas } from "./skills3d/SkillCanvas";
import { useTheme } from "../../contexts/ThemeContext";
import { BrainCircuit } from "lucide-react";

export default function SkillsConstellation() {
  const { themeVars } = useTheme();
  return (
    <section
      className="w-full py-20"
      style={{ background: themeVars.background, color: themeVars.foreground }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-2">
          <BrainCircuit size={36} style={{ color: themeVars.primary, flexShrink: 0 }} aria-label="Skills" />
          <span>My Skills</span>
        </h2>
        <p className="mt-2" style={{ color: themeVars.secondary }}>
          Explore the stack I orbit around
        </p>
      </div>
      <SkillCanvas />
    </section>
  );
}
