const INNER_RADIUS = 3;
const MID_RADIUS = 5;
const OUTER_RADIUS = 7;

export const skills = [
  // --- Core Orbit ---
  { name: "React", logo: "/logo/reactjs.png", orbit: "core" },
  { name: "Node.js", logo: "/logo/nodejs.png", orbit: "core" },
  { name: "MongoDB", logo: "/logo/mongodb.png", orbit: "core" },
  { name: "TypeScript", logo: "/logo/typescript.png", orbit: "core" },
  { name: "TailwindCSS", logo: "/logo/tailwind.png", orbit: "core" },
  { name: "Framer Motion", logo: "/logo/framer.png", orbit: "core" },
  { name: "Firebase", logo: "/logo/firebase.png", orbit: "core" },

  // --- Mid Orbit (Foundations & Applied CS) ---
  { name: "C", logo: "/logo/c.png", orbit: "mid" },
  { name: "C++", logo: "/logo/cpp.png", orbit: "mid" },
  { name: "Java", logo: "/logo/java.png", orbit: "mid" },
  { name: "Python", logo: "/logo/python.png", orbit: "mid" },
  { name: "AI/ML", logo: "/logo/aiml.png", orbit: "mid" },
  { name: "Data Science", logo: "/logo/datasci.png", orbit: "mid" },
  { name: "Cyber Security", logo: "/logo/cyber.png", orbit: "mid" },
  { name: "Algorithms & DSA", logo: "/logo/algorithm.png", orbit: "mid" },
  { name: "DBMS", logo: "/logo/dbms.png", orbit: "mid" },
  { name: "OS", logo: "/logo/os.png", orbit: "mid" },

  // --- Outer Orbit (Tools & Meta) ---
  { name: "Zustand", logo: "/logo/zustand.png", orbit: "outer" },
  { name: "Redux", logo: "/logo/redux.png", orbit: "outer" },
  { name: "Three.js", logo: "/logo/threejs.png", orbit: "outer" },
  { name: "Git/GitHub", logo: "/logo/github.png", orbit: "outer" },
  { name: "Vite", logo: "/logo/vite.png", orbit: "outer" },
  { name: "Markdown", logo: "/logo/markdown.png", orbit: "outer" },
  { name: "Jest", logo: "/logo/jest.png", orbit: "outer" },
  { name: "Playwright", logo: "/logo/playwright.png", orbit: "outer" },
  { name: "System Design", logo: "/logo/architecture.png", orbit: "outer" },
  { name: "UI/UX Thinking", logo: "/logo/design.png", orbit: "outer" },
  { name: "Agile & Collaboration", logo: "/logo/team.png", orbit: "outer" },
  { name: "Aptos Blockchain", logo: "/logo/aptos.png", orbit: "outer" },
  { name: "Move Smart Contracts", logo: "/logo/move.png", orbit: "outer" },
  { name: "Web3 & NFTs", logo: "/logo/web3.png", orbit: "outer" },
  { name: "Cryptography (RSA/JWT)", logo: "/logo/crypto.png", orbit: "outer" },
  { name: "PWA Development", logo: "/logo/PWA.png", orbit: "outer" }
].map((skill, i, arr) => {
  const orbitSkills = arr.filter(s => s.orbit === skill.orbit);
  const orbitIndex = orbitSkills.indexOf(skill);
  const angle = (orbitIndex / orbitSkills.length) * Math.PI * 2;
  const radius =
    skill.orbit === "core"
      ? INNER_RADIUS
      : skill.orbit === "mid"
      ? MID_RADIUS
      : OUTER_RADIUS;

  return {
    ...skill,
    position: [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ]
  };
});
