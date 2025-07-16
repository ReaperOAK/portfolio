import SectionWrapper from "./SectionWrapper";
import { useState } from "react";

const facts = [
  { front: "Favorite anime", back: "Death Note, for the duality. Like my mind." },
  { front: "Go-to beverage", back: "Karak chai—fuel for late-night coding and poetry." },
  { front: "Secret talent", back: "Can recite 20+ couplets from memory." },
];

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`group perspective w-48 h-32 cursor-pointer`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`relative w-full h-full duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
        <div className="absolute w-full h-full bg-slate-800/70 rounded-xl flex items-center justify-center text-lg font-semibold text-slate-200 backface-hidden">
          {front}
        </div>
        <div className="absolute w-full h-full bg-blue-700/80 rounded-xl flex items-center justify-center text-base text-slate-100 rotate-y-180 backface-hidden">
          {back}
        </div>
      </div>
    </div>
  );
}

export default function FunFactsSection() {
  return (
    <SectionWrapper>
      <h2 className="text-2xl font-bold mb-6">Fun Facts</h2>
      <div className="flex flex-wrap gap-6">
        {facts.map((fact, i) => (
          <FlipCard key={i} {...fact} />
        ))}
      </div>
    </SectionWrapper>
  );
}
