
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { skills } from '../../../data/skills';
import { SkillSphere } from './SkillSphere';
import { useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

function OrbitingSkills() {
  // Orbit all skills around the center sun
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillSphere key={i} {...skill} />
      ))}
    </group>
  );
}



export const SkillCanvas = () => {
  const { themeVars } = useTheme();
  return (
    <div className="h-[600px] w-full" style={{ background: themeVars?.background }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars
          radius={100}
          depth={50}
          count={typeof window !== 'undefined' ? Math.min(5000, Math.max(200, Math.floor((window.innerWidth * window.innerHeight) / 2400))) : 600}
          factor={4}
          fade
          saturation={themeVars?.background === '#1C0C2E' ? 0.7 : 1}
          color={themeVars?.highlight || '#FACC15'}
        />
        <OrbitControls enableZoom={false} />
        <OrbitingSkills themeVars={themeVars} />
      </Canvas>
    </div>
  );
}
