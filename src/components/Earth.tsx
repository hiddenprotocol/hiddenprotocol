import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Group>(null);

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame(({ clock }) => {
    if (earthRef.current && cloudsRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
    
    if (cageRef.current) {
      cageRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const createCage = () => {
    const group = new THREE.Group();
    
    // Create vertical bars
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 6, 8),
        new THREE.MeshStandardMaterial({ 
          color: '#4a4a4a',
          metalness: 0.9,
          roughness: 0.3,
          emissive: '#1a1a1a',
          emissiveIntensity: 0.2
        })
      );
      bar.position.set(
        Math.cos(angle) * 2.5,
        0,
        Math.sin(angle) * 2.5
      );
      group.add(bar);
    }

    // Create horizontal rings
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.03, 8, 50),
        new THREE.MeshStandardMaterial({ 
          color: '#4a4a4a',
          metalness: 0.9,
          roughness: 0.3,
          emissive: '#1a1a1a',
          emissiveIntensity: 0.2
        })
      );
      ring.position.y = -3 + (i * 2);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }

    // Add chains
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const chain = new THREE.Mesh(
        new THREE.TorusGeometry(0.15, 0.03, 8, 12),
        new THREE.MeshStandardMaterial({ 
          color: '#5a5a5a',
          metalness: 1,
          roughness: 0.2,
          emissive: '#2a2a2a',
          emissiveIntensity: 0.2
        })
      );
      
      for (let j = 0; j < 8; j++) {
        const link = chain.clone();
        link.position.set(
          Math.cos(angle) * 2.7,
          -2 + (j * 0.5),
          Math.sin(angle) * 2.7
        );
        link.rotation.x = Math.PI / 2;
        link.rotation.z = angle;
        group.add(link);
      }
    }

    return group;
  };

  return (
    <group>
      {/* Earth core */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(1, 1)}
          specularMap={specularMap}
          shininess={15}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Clouds layer */}
      <mesh ref={cloudsRef} scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Cage with chains */}
      <primitive ref={cageRef} object={createCage()} />
    </group>
  );
}