import { Html } from '@react-three/drei';
import { useState } from 'react';

export const SkillSphere = ({ name, position, logo }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html center distanceFactor={10}>
        <div
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          className={`transition-transform duration-200 ${hovered ? 'scale-110 z-10' : 'scale-100'} flex flex-col items-center`}
          style={{ filter: hovered ? 'drop-shadow(0 0 12px #fff8)' : 'drop-shadow(0 1px 4px #0008)' }}
        >
          <img
            src={logo}
            alt={name + ' logo'}
            className="w-16 h-16 object-contain rounded-lg bg-white/80 p-2 shadow-md"
            draggable={false}
            style={{ pointerEvents: 'none' }}
          />
          
            <div className="mt-2 bg-black text-white px-2 py-1 rounded text-xs shadow-lg border border-white/20">
              {name}
            </div>
          
        </div>
      </Html>
    </group>
  );
};
