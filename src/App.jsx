import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';
import Particles from './particles';
import { useMediaQuery } from 'react-responsive';

function App() {
  // Detect if the screen is small (mobile)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Canvas dpr={isMobile ? 1 : 2} camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.3} />
        <Particles count={10000} /> {/* Increase or decrease the count as needed */}
        <directionalLight position={[10, 10, 5]} intensity={isMobile ? 0.5 : 1} />
        <Model />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default App;
