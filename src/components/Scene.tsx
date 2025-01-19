import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { Stars } from './Stars';

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const t = clock.getElapsedTime();
      const radius = 8 + Math.sin(t * 0.2) * 2; // Increased camera distance
      const angle = t * 0.2;
      
      cameraRef.current.position.x = Math.sin(angle) * radius;
      cameraRef.current.position.z = Math.cos(angle) * radius;
      cameraRef.current.position.y = Math.sin(t * 0.1) * 2;
      
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        fov={45}
      />
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 3, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      {/* Add red accent lights for dramatic effect */}
      <pointLight position={[5, 0, 5]} intensity={0.5} color="#ff0000" />
      <pointLight position={[-5, 0, -5]} intensity={0.5} color="#ff0000" />
      
      <Earth />
      <Stars />
    </>
  );
}