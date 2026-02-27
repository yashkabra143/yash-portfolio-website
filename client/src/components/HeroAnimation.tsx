import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshWobbleMaterial, Float, Stars } from '@react-three/drei';
import { useTheme } from './ThemeProvider';
import * as THREE from 'three';

// Floating particle cloud
function ParticleField({ count = 80, color }: { count?: number; color: string }) {
  const mesh = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.04;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Orbiting rings
function OrbitRing({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

// Central distorted sphere
function CoreSphere({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={primaryColor}
          distort={0.4}
          speed={2.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Small floating satellite spheres
function Satellite({ angle, radius, color, size = 0.15 }: { angle: number; radius: number; color: string; size?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.cos(t * 0.6 + angle) * radius;
    ref.current.position.z = Math.sin(t * 0.6 + angle) * radius;
    ref.current.position.y = Math.sin(t * 0.4 + angle) * 0.5;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <MeshWobbleMaterial color={color} factor={0.4} speed={3} roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  const primary   = isDark ? '#74B9FF' : '#0984E3';
  const secondary = isDark ? '#A29BFE' : '#6C5CE7';
  const accent    = isDark ? '#00D4AA' : '#00B894';
  const bgStars   = isDark ? '#ffffff' : '#6C5CE7';

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[4, 4, 4]}   intensity={isDark ? 1.5 : 1.2} color={primary} />
      <pointLight position={[-4, -2, -4]} intensity={0.8}               color={secondary} />
      <pointLight position={[0, 4, -2]}  intensity={0.6}               color={accent} />

      <CoreSphere primaryColor={primary} secondaryColor={secondary} />

      <OrbitRing radius={1.7} speed={0.5}  tilt={Math.PI / 6}  color={primary} />
      <OrbitRing radius={2.1} speed={-0.3} tilt={Math.PI / 3}  color={secondary} />
      <OrbitRing radius={2.5} speed={0.2}  tilt={Math.PI / 1.5} color={accent} />

      <Satellite angle={0}              radius={1.7} color={accent}     size={0.14} />
      <Satellite angle={Math.PI * 0.66} radius={2.0} color={secondary}  size={0.10} />
      <Satellite angle={Math.PI * 1.33} radius={1.8} color={primary}    size={0.12} />

      <ParticleField count={100} color={isDark ? '#A29BFE' : '#6C5CE7'} />

      {isDark && <Stars radius={12} depth={4} count={300} factor={2} fade speed={0.5} />}
    </>
  );
}

export default function HeroAnimation() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="h-72 md:h-80 lg:h-96 w-full max-w-sm mx-auto rounded-2xl overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene isDark={isDark} />
      </Canvas>
      {/* Soft glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 50%, rgba(116,185,255,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 50%, rgba(9,132,227,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
