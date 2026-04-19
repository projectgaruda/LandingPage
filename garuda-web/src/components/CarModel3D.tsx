"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useProgress, Html } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useLoader } from "@react-three/fiber";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: "#00ff41",
        fontFamily: "Orbitron, monospace",
        fontSize: "0.7rem",
        letterSpacing: "0.3em",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          {Math.round(progress)}%
        </div>
        LOADING MODEL
      </div>
    </Html>
  );
}

function CarMesh() {
  const geometry = useLoader(STLLoader, "/car_model.stl");

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#0a2010"
        metalness={0.85}
        roughness={0.15}
        envMapIntensity={1.5}
        emissive="#003310"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function CarModel3D() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Hint text */}
      <div style={{
        position: "absolute",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "Orbitron, monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
        color: "rgba(0,255,65,0.4)",
        zIndex: 10,
        whiteSpace: "nowrap",
      }}>
        ↻ DRAG TO ROTATE · SCROLL TO ZOOM
      </div>

      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} color="#001a08" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          color="#00ff41"
          castShadow
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.4}
          color="#ffffff"
        />
        <pointLight position={[0, -2, 0]} intensity={0.5} color="#00c832" />

        {/* Green rim light */}
        <spotLight
          position={[0, 8, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.8}
          color="#00ff41"
        />

        <Suspense fallback={<Loader />}>
          <Stage
            environment="night"
            intensity={0.3}
            adjustCamera={1.2}
          >
            <CarMesh />
          </Stage>
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 8}
          maxDistance={12}
          minDistance={2}
        />
      </Canvas>
    </div>
  );
}
