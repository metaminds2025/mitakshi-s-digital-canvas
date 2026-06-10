import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GlassOrb({
  position,
  scale = 1,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <Sphere args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={1.6}
          roughness={0.05}
          metalness={0.4}
          transparent
          opacity={0.55}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.4 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.04;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 6, 4]} intensity={1.4} color="#c4a3ff" />
      <pointLight position={[-8, -4, -4]} intensity={1.2} color="#7fd6ff" />
      <pointLight position={[0, -8, 6]} intensity={0.9} color="#ff9ec7" />

      <Stars radius={40} depth={40} count={1800} factor={3} fade speed={0.6} />
      <Particles />

      <GlassOrb position={[-3.2, 1.4, -1]} scale={1.4} color="#b388ff" speed={1.1} />
      <GlassOrb position={[3.5, -1.6, -2]} scale={1.7} color="#7fd6ff" speed={0.9} />
      <GlassOrb position={[0.5, 2.4, -3]} scale={0.9} color="#ff9ec7" speed={1.3} />
      <GlassOrb position={[-2, -2.4, 0]} scale={0.7} color="#ffd6a5" speed={1.0} />
    </group>
  );
}

export function Background3D() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
      style={{ contain: "strict" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* soft top/bottom vignettes to keep contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, color-mix(in oklab, var(--color-background) 70%, transparent) 100%)",
        }}
      />
    </div>
  );
}
