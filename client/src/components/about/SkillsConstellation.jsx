import { SkillCanvas } from "./skills3d/SkillCanvas";

export default function SkillsConstellation() {
  return (
    <section className="bg-black text-white py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">🧠 My Skills</h2>
        <p className="text-gray-400 mt-2">Explore the stack I orbit around</p>
      </div>
      <SkillCanvas />
    </section>
  );
}
