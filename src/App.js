import React, { useRef, useState } from "react";
import "./App.scss";

import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
// import { Box } from "drei";

softShadows();

const SpinningBox = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  // useframe needs to be in its own component
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const [expand, setExpand] = useState(false);
  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        {/* ambientlight iluminates all of the objects on the scene equally, no cast shadows */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-heigth={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <pointLight position={[-10, 9, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
        </group>

        <SpinningBox
          position={[0, 1, 0]}
          args={[3, 2, 1]}
          color="white"
          speed={2}
        />
        <SpinningBox position={[-2, 1, -5]} color="red" speed={6} />
        <SpinningBox position={[5, 1, -2]} color="red" speed={6} />
        <OrbitControls />
        {/* <Box>
          <meshStandardMaterial attach="material" />
        </Box> */}
      </Canvas>
    </>
  );
}

export default App;
