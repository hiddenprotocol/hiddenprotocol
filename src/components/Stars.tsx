import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const [stars] = useState(() => {
    const vertices = [];
    const sizes = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < 15000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      vertices.push(x, y, z);

      // Randomize star sizes
      sizes.push(Math.random() * 2 + 0.5);

      // Create color variations from white to slight blue
      const mixAmount = Math.random() * 0.3; // 0-0.3 mix with blue
      color.setRGB(
        1 - mixAmount * 0.3,  // Reduce red slightly
        1 - mixAmount * 0.2,  // Reduce green less
        1                     // Keep blue at max
      );
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geometry;
  });

  useFrame(({ clock }) => {
    if (starsRef.current) {
      const t = clock.getElapsedTime();
      starsRef.current.rotation.x = t * 0.05;
      starsRef.current.rotation.y = t * 0.025;
      
      // Gentle pulsing effect
      if (starsRef.current.material instanceof THREE.PointsMaterial) {
        starsRef.current.material.size = 1.5 + Math.sin(t * 0.5) * 0.2;
      }
    }
  });

  return (
    <points ref={starsRef}>
      <primitive object={stars} />
      <pointsMaterial
        size={1.5}
        sizeAttenuation={true}
        vertexColors={true}
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}