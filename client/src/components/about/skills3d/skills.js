// All skills are placed at equal distance from the sun, in a perfect ring
const RADIUS = 6.5; // Increased distance from sun
export const skills = [
  { name: "React", logo: "/logo/reactjs.png" },
  { name: "Node.js", logo: "/logo/nodejs.png" },
  { name: "MongoDB", logo: "/logo/mongodb.png" },
  { name: "TypeScript", logo: "/logo/typescript.png" },
  { name: "TailwindCSS", logo: "/logo/tailwind.png" },
  { name: "Framer Motion", logo: "/logo/framer.png" },
  { name: "Firebase", logo: "/logo/firebase.png" },
  { name: "Zustand", logo: "/logo/zustand.png" },
  { name: "Markdown", logo: "/logo/markdown.png" },
].map((skill, i, arr) => {
  const angle = (i / arr.length) * Math.PI * 2;
  return {
    ...skill,
    position: [
      Math.cos(angle) * RADIUS,
      0,
      Math.sin(angle) * RADIUS
    ]
  };
});
