import SectionWrapper from "./SectionWrapper";

const personas = [
  { icon: "🛵", title: "Rider", desc: "Long rides clear my mind and inspire new ideas for code and poetry." },
  { icon: "📚", title: "Bookworm", desc: "Reading fiction and philosophy shapes my approach to problem-solving." },
  { icon: "🎧", title: "Music Lover", desc: "Beats and melodies fuel my flow state when building products." },
  { icon: "🖋️", title: "Poet", desc: "Writing shayari keeps my creativity sharp and my code expressive." },
];

function PersonaCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-5 flex flex-col items-center shadow-md min-w-[220px] mx-2 hover:scale-105 transition-transform">
      <span className="text-3xl mb-2">{icon}</span>
      <span className="font-bold text-slate-200 mb-1">{title}</span>
      <span className="text-slate-400 text-sm text-center">{desc}</span>
    </div>
  );
}

export default function PersonaSection() {
  return (
    <SectionWrapper>
      <h2 className="text-2xl font-bold mb-6">Beyond Code</h2>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {personas.map((p) => (
          <PersonaCard key={p.title} {...p} />
        ))}
      </div>
    </SectionWrapper>
  );
}
