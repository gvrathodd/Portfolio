import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { SunBurst } from './SunBurst';

/**
 * One fixed WebGL layer over the whole page. It never takes clicks, and it sits over the glass
 * rather than under it, so the backdrop blur never has to redraw behind a moving scene.
 */
const Sky3D: React.FC = () => {
  useEffect(() => () => document.documentElement.classList.remove('has-webgl'), []);

  return (
    <div aria-hidden className="sky3d pointer-events-none fixed inset-0 z-30">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 35, near: 0.5, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => document.documentElement.classList.add('has-webgl')}
      >
        {/* Bright sky-studio lighting baked once into an environment map: a pale base so the pearl
            never reflects black, a soft top light, and warm and cool fill from the sides */}
        <Environment resolution={256}>
          <color attach="background" args={['#b9c4d8']} />
          <Lightformer form="rect" intensity={3} position={[0, 6, -2]} scale={[14, 5, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#ffd9bd" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 6, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#c4e2ff" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 6, 1]} />
          <Lightformer form="circle" intensity={4} position={[-2.5, 3, 6]} scale={1.2} />
        </Environment>
        <SunBurst />
      </Canvas>
    </div>
  );
};

export default Sky3D;
