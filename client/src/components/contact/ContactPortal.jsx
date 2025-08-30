import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

function AtomicRing({ radius, tube, color, speed = 1, tilt = [0, 0, 0] }) {
  const group = useRef();
  const electron = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += speed * delta;
    if (electron.current) electron.current.rotation.z -= speed * 1.8 * delta;
  });
  return (
    <group ref={group} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, tube, 16, 200]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          transparent
          opacity={0.85}
          metalness={0.35}
          roughness={0.2}
        />
      </mesh>
      {/* Electron */}
      <group ref={electron}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[tube * 1.8, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>
    </group>
  );
}

function EnergyPortal({ baseColor = '#C084FC', accentColor = '#FB7185' }) {
  const groupRef = useRef();

  // subtle pointer parallax
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.2;
    const targetY = state.pointer.x * 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.45}>
      <group ref={groupRef}>
        {/* Thin atomic rings */}
        <AtomicRing radius={1.15} tube={0.03} color={baseColor} speed={0.8} tilt={[0.35, 0.1, 0]} />
        <AtomicRing radius={0.95} tube={0.025} color={accentColor} speed={-1.0} tilt={[0.1, 0.4, Math.PI / 6]} />
        <AtomicRing radius={0.75} tube={0.02} color={baseColor} speed={1.2} tilt={[0.5, -0.2, -Math.PI / 8]} />

        {/* Refractive glowing core */}
        <mesh>
          <sphereGeometry args={[0.26, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            transmission={1}
            thickness={0.5}
            roughness={0.18}
            ior={1.2}
            chromaticAberration={0.03}
            anisotropy={0.2}
            distortion={0.12}
            temporalDistortion={0.12}
            color={accentColor}
          />
        </mesh>

        {/* Vortex aperture for extra depth */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.3, 1.3, 64, 64]} />
          <MeshDistortMaterial
            color={baseColor}
            transparent
            opacity={0.35}
            distort={0.3}
            speed={2.2}
            emissive={baseColor}
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Sparkles/energy particles */}
        <Sparkles count={45} size={2.2} speed={0.7} color={accentColor} scale={2.4} />

        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 2, 3]} intensity={0.95} color={baseColor} />
        <pointLight position={[-2, -1, -2]} intensity={0.55} color={accentColor} />
      </group>
    </Float>
  );
}

export default function ContactPortal({ className = 'w-64 h-64 mx-auto' }) {
  const { themeVars } = useTheme();
  const primary = themeVars?.primary || '#C084FC';
  const accent = themeVars?.accent || '#FB7185';

  // feature-detect WebGL to provide an accessible fallback
  const [hasWebGL, setHasWebGL] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // Fallback small UI for non-WebGL environments (mobile or restricted browsers)
  if (!hasWebGL) {
    return (
      <div className={`${className} flex flex-col items-center justify-center p-4`} role="img" aria-label="Contact portal fallback">
        <div className="text-3xl mb-3" aria-hidden>
          🌀
        </div>
        <div className="text-center text-sm opacity-80 mb-3">Interactive 3D portal is unavailable in this browser. Use the quick links below to connect.</div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <a className="p-3 rounded-lg border text-center" href="mailto:owais@example.com">📧 Email</a>
          <a className="p-3 rounded-lg border text-center" href="https://linkedin.com/in/owais" target="_blank" rel="noreferrer">💼 LinkedIn</a>
          <a className="p-3 rounded-lg border text-center" href="https://github.com/ReaperOAK" target="_blank" rel="noreferrer">🐙 GitHub</a>
          <a className="p-3 rounded-lg border text-center" href="https://calendly.com/owais" target="_blank" rel="noreferrer">📅 Schedule</a>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
      >
  {/* Decorative energy portal */}
  <EnergyPortal baseColor={primary} accentColor={accent} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  );
}
