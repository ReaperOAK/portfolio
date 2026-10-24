
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';



function AnimatedWireframe({ baseColor = '#4080ff', ...props }) {
  const mesh = useRef();
  const geometryRef = useRef();
  // Precompute sphere and icosahedron positions for morphing
  const { icoPositions, spherePositions } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(20, 1);
    const sphere = new THREE.SphereGeometry(20, 32, 16);
    return {
      icoPositions: ico.attributes.position.array.slice(),
      spherePositions: sphere.attributes.position.array.slice(),
    };
  }, []);

  useFrame(({ clock }) => {
    if (mesh.current && geometryRef.current) {
      // Morph between icosahedron and sphere
      const t = (Math.sin(clock.getElapsedTime() * 0.5) + 1) / 2; // 0..1
      const pos = geometryRef.current.attributes.position;
      for (let i = 0; i < pos.count * 3; i++) {
        pos.array[i] = THREE.MathUtils.lerp(icoPositions[i], spherePositions[i], t);
      }
      pos.needsUpdate = true;
      // Breathing scale
      const scale = 1 + Math.sin(clock.getElapsedTime() * 1.2) * 0.07;
      mesh.current.scale.set(scale, scale, scale);
      // Playful rotation
      mesh.current.rotation.y += 0.004;
      mesh.current.rotation.x += 0.002;
    }
  });

  // Animate color hue
  const [r, g, b] = useMemo(() => {
    const c = new THREE.Color(baseColor);
    return [c.r, c.g, c.b];
  }, [baseColor]);

  const colorRef = useRef({ r, g, b });
  useFrame(({ clock }) => {
    const hue = (clock.getElapsedTime() * 0.08) % 1;
    const c = new THREE.Color().setHSL(hue, 0.6, 0.6);
    colorRef.current = { r: c.r, g: c.g, b: c.b };
  });

  return (
    <mesh ref={mesh} {...props}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={icoPositions.length / 3}
          array={Float32Array.from(icoPositions)}
          itemSize={3}
        />
      </bufferGeometry>
      <meshBasicMaterial color="black" transparent opacity={0.0} />
      <Edges
        scale={1.01}
        color={new THREE.Color(colorRef.current.r, colorRef.current.g, colorRef.current.b)}
        linewidth={2}s
      />
    </mesh>
  );
}

export default function WireframeIcosahedronBg({ color = '#4080ff' }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 select-none">
      <Canvas camera={{ position: [-50, 0, 50], fov: 40 }}>
        <AnimatedWireframe baseColor={color} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
