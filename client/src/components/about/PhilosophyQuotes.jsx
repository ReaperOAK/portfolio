import SectionWrapper from "./SectionWrapper";
import { useState, useEffect } from "react";

const quotes = [
  "I write code the way I write shayari: minimal, meaningful, and honest.",
  "Every bug is a poem waiting to be understood.",
  "Simplicity is the ultimate sophistication — both in code and verse."
];

export default function PhilosophyQuotes() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SectionWrapper>
      <blockquote className="text-center italic text-lg text-slate-400 font-serif min-h-[60px] transition-all duration-500">
        “{quotes[index]}”
      </blockquote>
    </SectionWrapper>
  );
}
