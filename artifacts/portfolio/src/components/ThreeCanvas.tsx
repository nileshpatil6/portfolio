import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.03;
    mesh.current.rotation.x = t * 0.01;
    (camera as THREE.PerspectiveCamera).position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
    (camera as THREE.PerspectiveCamera).position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometry() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh1.current) {
      mesh1.current.rotation.x = t * 0.3;
      mesh1.current.rotation.y = t * 0.4;
      mesh1.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x = -t * 0.2;
      mesh2.current.rotation.z = t * 0.3;
      mesh2.current.position.y = Math.cos(t * 0.4) * 0.3;
    }
    if (mesh3.current) {
      mesh3.current.rotation.y = t * 0.5;
      mesh3.current.rotation.x = t * 0.2;
      mesh3.current.position.x = Math.sin(t * 0.3) * 0.3;
    }
  });

  const wireMat = (color: string) => (
    <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
  );

  return (
    <>
      <mesh ref={mesh1} position={[-4, 1, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        {wireMat("#00d4ff")}
      </mesh>
      <mesh ref={mesh2} position={[4, -1, -3]}>
        <octahedronGeometry args={[1.0, 0]} />
        {wireMat("#7c3aed")}
      </mesh>
      <mesh ref={mesh3} position={[0, -3, -4]}>
        <tetrahedronGeometry args={[1.5, 0]} />
        {wireMat("#00ff88")}
      </mesh>
    </>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles count={1500} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
