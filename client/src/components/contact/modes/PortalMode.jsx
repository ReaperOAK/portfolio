import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitControls, Html, Float, Sparkles, MeshDistortMaterial, MeshTransmissionMaterial, Line } from '@react-three/drei';
import { Mail, Linkedin, Github, Calendar } from 'lucide-react';
import * as THREE from 'three';
import { useTheme } from '../../../contexts/ThemeContext';

const contactMethods = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    action: () => window.open('mailto:owais@example.com', '_blank'),
    position: [3, 0, 0],
    color: '#3B82F6'
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    action: () => window.open('https://linkedin.com/in/owais', '_blank'),
    position: [0, 3, 0],
    color: '#0077B5'
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    action: () => window.open('https://github.com/ReaperOAK', '_blank'),
    position: [-3, 0, 0],
    color: '#333333'
  },
  {
    id: 'schedule',
    icon: Calendar,
    label: 'Schedule',
    action: () => window.open('https://calendly.com/owais', '_blank'),
    position: [0, -3, 0],
    color: '#10B981'
  }
];

function ContactOrb({ method, isExpanded, onClick, orbitRadius, speed, tilt = [0, 0, 0], angleOffset = 0, iconColor }) {
  const orbRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const Icon = method.icon;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Always revolve around center (no gating)
    if (groupRef.current) {
      const a = t * speed + angleOffset;
      const x = Math.cos(a) * orbitRadius;
      const y = Math.sin(a) * orbitRadius;
      groupRef.current.position.set(x, y, 0);
    }
    if (orbRef.current) {
      // Subtle wobble
      orbRef.current.rotation.y += 0.01;
      const s = hovered ? 1.18 : 1;
      orbRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      <mesh
        ref={orbRef}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.36, 32, 32]} />
        {/* Invisible hit mesh: keeps interactivity but removes the visible sphere (emoji sprite is visible) */}
        <meshBasicMaterial color={method.color} transparent opacity={0.001} depthWrite={false} />
      </mesh>

      {/* Lucide SVG icon rendered via Html so it sits inside the orb */}
      <Html position={[0, 0, 0]} center>
        <div className="pointer-events-none flex items-center justify-center" style={{ width: 56, height: 56, transform: 'translateY(-6px)' }}>
          {React.createElement(Icon, { size: 28, color: iconColor })}
        </div>
      </Html>

  {/* label removed - sprite-only orb for cleaner look */}

      <pointLight position={[0, 0, 0]} intensity={hovered ? 1.6 : 1.1} color={method.color} />
    </group>
  );
}

function EnhancedCore({ isExpanded, onToggle, baseColor, accentColor }) {
  const coreRef = useRef();
  const planeRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05 + (hovered ? 0.05 : 0));
    if (planeRef.current) planeRef.current.rotation.z = Math.sin(t * 0.8) * 0.2;
    if (groupRef.current) {
      const tx = pointer.y * 0.15;
      const ty = pointer.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tx, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ty, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core */}
      <mesh
        ref={coreRef}
        onClick={onToggle}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.65, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          transmission={1}
          thickness={0.55}
          roughness={0.18}
          ior={1.2}
          chromaticAberration={0.035}
          anisotropy={0.2}
          distortion={0.1}
          temporalDistortion={0.1}
          color={accentColor}
        />
      </mesh>

      {/* Aperture */}
      <mesh ref={planeRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.6, 64, 64]} />
        <MeshDistortMaterial
          color={baseColor}
          transparent
          opacity={0.28}
          distort={0.22}
          speed={1.6}
          emissive={baseColor}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

function Portal3D() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const groupRef = useRef();

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  const handleOrbClick = (method) => method.action();

  if (!hasWebGL) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-3xl mb-3" aria-hidden>🌀</div>
        <div className="text-center text-sm opacity-80 mb-4">Interactive portal unavailable. Use quick links below to connect.</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas style={{ width: '100%', height: '100%', display: 'block' }} camera={{ position: [0, 0, 6], fov: 50 }} onCreated={({ camera }) => camera.lookAt(0, 0, 0)}>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 8]} intensity={1} />

      {/* Parallax container */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Core */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
          <EnhancedCore 
            isExpanded={isExpanded} 
            onToggle={() => setIsExpanded((v) => !v)} 
            baseColor={'#C084FC'} 
            accentColor={'#FB7185'} 
          />
        </Float>

        {/* Softer orbit lines (reduced count & opacity) */}
        <group rotation={[0.2, 0.05, 0]}>
          <Line points={new THREE.EllipseCurve(0,0,2.3,2.3,0,Math.PI*2,false,0).getPoints(120)} color={'#ffffff'} opacity={0.08} transparent lineWidth={0.9} />
        </group>
        <group rotation={[0.12, 0.32, Math.PI/6]}>
          <Line points={new THREE.EllipseCurve(0,0,1.9,1.9,0,Math.PI*2,false,0).getPoints(120)} color={'#ffffff'} opacity={0.07} transparent lineWidth={0.9} />
        </group>

        {/* Contact orbs on orbits (iconColor forwarded from Theme at the PortalMode level) */}
        <ContactOrb
          method={contactMethods[0]}
          isExpanded={isExpanded}
          onClick={() => handleOrbClick(contactMethods[0])}
          orbitRadius={2.6}
          speed={0.8}
          tilt={[0.35, 0.1, 0]}
          angleOffset={0}
          iconColor={contactMethods[0].color}
        />
        <ContactOrb
          method={contactMethods[1]}
          isExpanded={isExpanded}
          onClick={() => handleOrbClick(contactMethods[1])}
          orbitRadius={2.2}
          speed={-1.0}
          tilt={[0.1, 0.4, Math.PI/6]}
          angleOffset={Math.PI/3}
          iconColor={contactMethods[1].color}
        />
        <ContactOrb
          method={contactMethods[2]}
          isExpanded={isExpanded}
          onClick={() => handleOrbClick(contactMethods[2])}
          orbitRadius={1.8}
          speed={1.2}
          tilt={[0.5, -0.2, -Math.PI/8]}
          angleOffset={Math.PI*0.66}
          iconColor={contactMethods[2].color}
        />
        <ContactOrb
          method={contactMethods[3]}
          isExpanded={isExpanded}
          onClick={() => handleOrbClick(contactMethods[3])}
          orbitRadius={2.2}
          speed={0.9}
          tilt={[0.1, 0.4, Math.PI/6]}
          angleOffset={Math.PI*1.2}
          iconColor={contactMethods[3].color}
        />

  {/* Particles (reduced) */}
  <Sparkles count={22} size={1.6} speed={0.55} color={'#ffffff'} scale={4} />
      </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isExpanded}
          autoRotateSpeed={0.4}
          makeDefault
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

export default function PortalMode() {
  const { themeVars } = useTheme();
  const [showInstructions, setShowInstructions] = useState(true);

  const primary = themeVars?.primary || '#C084FC';

  return (
    <div className="text-center py-16">
      {/* Instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Contact Portal 🌀
            </h2>
            <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
              Click the central portal to reveal contact methods, then click any orb to connect with me.
              Drag to explore the 3D space!
            </p>
            <motion.button
              onClick={() => setShowInstructions(false)}
              className="px-6 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-300"
              style={{ borderColor: primary, color: primary }}
              whileHover={{ backgroundColor: primary, color: themeVars?.background }}
            >
              Got it!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Portal */}
      <motion.div
        className="w-full h-96 rounded-2xl overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, rgba(192, 132, 252, 0.1) 0%, transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: showInstructions ? 0.6 : 0 }}
      >
        <Portal3D />
      </motion.div>

      {/* Contact Methods Grid (fallback for mobile) */}
      <motion.div
        className="mt-12 md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h3 className="text-xl font-bold mb-6">Quick Connect</h3>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {contactMethods.map((method) => {
            const IconComp = method.icon;
            return (
              <motion.button
                key={method.id}
                onClick={method.action}
                className="p-4 rounded-xl border-2 transition-all duration-300"
                style={{ 
                  borderColor: method.color,
                  backgroundColor: `${method.color}20`
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: `${method.color}30`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-2">
                          {IconComp ? React.createElement(IconComp, { size: 28, color: themeVars?.primary || method.color }) : null}
                </div>
                <div className="text-sm font-medium">{method.label}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Real-time info */}
      <motion.div
        className="mt-8 text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <p>
          It's {new Date().toLocaleTimeString()} in Kolkata... I'm probably still coding 😅
        </p>
      </motion.div>
    </div>
  );
}
