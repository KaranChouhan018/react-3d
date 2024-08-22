import {React ,  useRef } from 'react';
import { useGLTF, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';

export function Model(props) {
  const { nodes } = useGLTF('/torus.glb');
  const meshRef = useRef();

  // Detect if the screen is small (mobile)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Automatic rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t / 2;
    meshRef.current.rotation.y = t / 2;
  });

  // Mouse interaction
  const handlePointerMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / window.innerWidth) * 2 - 1;
    const y = -(offsetY / window.innerHeight) * 2 + 1;
    
    meshRef.current.rotation.x = y * 0.5;
    meshRef.current.rotation.y = x * 0.5;
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Torus.geometry}
        onPointerMove={handlePointerMove}
        scale={isMobile ? [5, 6, 5] : [5, 5, 5]} // Smaller scale for mobile
      >
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9} // Slightly reduced transmission for performance
          roughness={0.1} // Increase roughness slightly to reduce render cost
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          thickness={0.5} // Reduced thickness for better performance on mobile
          envMapIntensity={isMobile ? 0.5 : 1} // Lower intensity for mobile
        />
      </mesh>
      <Environment preset={isMobile ? "dawn" : "sunset"} /> {/* Lower intensity environment for mobile */}
    </group>
  );
}

useGLTF.preload('/torus.glb');
