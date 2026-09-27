import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Text,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

/* =========================================
   PLANET DATA
========================================= */

const planets = [
  {
    name: "Mercury",
    size: 0.32,
    distance: 2.5,
    speed: 1.5,
    color: "#9ca3af",
    description:
      "Mercury is the smallest planet and the closest planet to the Sun.",
    facts: "A year on Mercury lasts only 88 Earth days.",
  },
  {
    name: "Venus",
    size: 0.40,
    distance: 3.5,
    speed: 1.2,
    color: "#d4a373",
    description:
      "Venus is a hot world covered by a thick carbon-dioxide atmosphere.",
    facts:
      "Venus is the hottest planet in the Solar System.",
  },
  {
    name: "Earth",
    size: 0.45,
    distance: 4.5,
    speed: 1,
    color: "#3b82f6",
    description:
      "Earth is our home planet and the only world currently known to support life.",
    facts:
      "About 71% of Earth's surface is covered by water.",
  },
  {
    name: "Mars",
    size: 0.38,
    distance: 5.5,
    speed: 0.8,
    color: "#ef4444",
    description:
      "Mars is the Red Planet, known for its dusty surface and ancient valleys.",
    facts:
      "Mars is home to Olympus Mons, the largest volcano in the Solar System.",
  },
  {
    name: "Jupiter",
    size: 0.72,
    distance: 6.7,
    speed: 0.5,
    color: "#d97706",
    description:
      "Jupiter is the largest planet and is famous for its enormous storms.",
    facts:
      "Jupiter is more massive than all the other planets combined.",
  },
  {
    name: "Saturn",
    size: 0.68,
    distance: 8.0,
    speed: 0.35,
    color: "#eab308",
    description:
      "Saturn is a gas giant surrounded by a spectacular system of rings.",
    facts:
      "Saturn's rings are made mostly of ice and rocky particles.",
  },
  {
    name: "Uranus",
    size: 0.52,
    distance: 9.3,
    speed: 0.25,
    color: "#06b6d4",
    description:
      "Uranus is an ice giant with a blue-green atmosphere and extreme tilt.",
    facts:
      "Uranus rotates almost completely on its side.",
  },
  {
    name: "Neptune",
    size: 0.52,
    distance:10.6,
    speed: 0.2,
    color: "#2563eb",
    description:
      "Neptune is the distant blue ice giant with extremely fast winds.",
    facts:
      "Neptune has some of the fastest winds in the Solar System.",
  },
];

/* =========================================
   ORBIT RING
========================================= */

function OrbitRing({ distance }) {
  return (
    <mesh>
      <ringGeometry
        args={[
          distance - 0.012,
          distance + 0.012,
          160,
        ]}
      />

      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.45}
        side={2}
      />
    </mesh>
  );
}

/* =========================================
   SATURN RING
========================================= */

function SaturnRing({ size }) {
  return (
    <mesh>
      <ringGeometry
        args={[
          size * 1.35,
          size * 1.8,
          64,
        ]}
      />

      <meshBasicMaterial
        color="#d6c28f"
        transparent
        opacity={0.7}
        side={2}
      />
    </mesh>
  );
}

/* =========================================
   PLANET
========================================= */

function Planet({
  planet,
  paused,
  speedMultiplier,
  showNames,
  onSelect,
}) {
  const planetRef = useRef();

  useFrame(({ clock }) => {
    if (!planetRef.current) return;

    const time =
      clock.getElapsedTime() *
      planet.speed *
      speedMultiplier;

    if (!paused) {
      planetRef.current.position.x =
        Math.cos(time) * planet.distance;

      planetRef.current.position.y =
        Math.sin(time) * planet.distance;

      planetRef.current.position.z = 0;

      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group
      ref={planetRef}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(planet);
      }}
    >
      <mesh>
        <sphereGeometry
          args={[
            planet.size,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color={planet.color}
          roughness={0.75}
        />
      </mesh>

      {planet.name === "Saturn" && (
        <SaturnRing size={planet.size} />
      )}

      {showNames && (
        <Text
          position={[
            0,
            planet.size + 0.4,
            0,
          ]}
          fontSize={0.27}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="black"
        >
          {planet.name}
        </Text>
      )}
    </group>
  );
}
/* =========================================
   BLINKING STARS
========================================= */

function TwinklingStars() {
  const starsRef = useRef();

  useFrame(({ clock }) => {
    if (!starsRef.current) return;

    const time = clock.getElapsedTime();

    starsRef.current.material.opacity =
      0.55 + Math.sin(time * 2) * 0.2;
  });

  return (
    <points ref={starsRef}>
      <sphereGeometry
        args={[40, 64, 64]}
      />

      <pointsMaterial
        color="white"
        size={0.035}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}
/* =========================================
   SOLAR SYSTEM SCENE
========================================= */

function SolarSystemScene({
  paused,
  speedMultiplier,
  showNames,
  onSelect,
}) {
  return (
    <>
      {/* Lighting */}

      <ambientLight intensity={0.25} />

      <pointLight
        position={[0, 0, 0]}
        intensity={35}
        distance={45}
      />

      {/* Orbit paths */}

      {planets.map((planet) => (
        <OrbitRing
          key={planet.name}
          distance={planet.distance}
        />
      ))}

      {/* =====================================
          SUN
      ===================================== */}

      {/* SUN */}
<mesh>
  <sphereGeometry args={[1.45, 48, 48]} />

  <meshBasicMaterial
    color="#ff6a00"
    toneMapped={false}
  />
</mesh>


      {/* Sun glow */}

      <mesh>
        <sphereGeometry
          args={[1.4, 32, 32]}
        />

        <meshBasicMaterial
          color="#ffb300"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* =====================================
          PLANETS
      ===================================== */}

      {planets.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          paused={paused}
          speedMultiplier={speedMultiplier}
          showNames={showNames}
          onSelect={onSelect}
        />
      ))}

      {/* =====================================
          SUBTLE STAR FIELD
      ===================================== */}

      <Stars
        radius={100}
        depth={70}
        count={900}
        factor={1.1}
        saturation={0}
        fade
        speed={0.35}
      />

      {/* =====================================
          CAMERA
      ===================================== */}
<OrbitControls
  enableZoom={false}
  enablePan={false}
  enableRotate={false}
  minDistance={9}
  maxDistance={22}
  target={[0, 0, 0]}
/>
      
    </>
  );
}

/* =========================================
   MAIN SOLAR SYSTEM
========================================= */

function SolarSystem() {
  const [paused, setPaused] =
    useState(false);

  const [speedMultiplier, setSpeedMultiplier] =
    useState(1);

  const [showNames, setShowNames] =
    useState(true);

  const [selectedPlanet, setSelectedPlanet] =
    useState(null);

  return (
    <>
    <div className="solar-system">

      {/* 3D SOLAR SYSTEM */}

      <Canvas
        gl={{
          alpha: true,
          antialias: true,
        }}
        camera={{
          position: [0, -0.8, 400],
          fov: 90,
        }}
      >
        <SolarSystemScene
          paused={paused}
          speedMultiplier={speedMultiplier}
          showNames={showNames}
          onSelect={setSelectedPlanet}
        />
      </Canvas>

      {/* =====================================
          CONTROLS
      ===================================== */}

      <div className="solar-controls">
        

        <button
          onClick={() =>
            setPaused(!paused)
          }
        >
          {paused
            ? "▶ Resume"
            : "Ⅱ Pause"}
        </button>

        <button
          onClick={() =>
            setSpeedMultiplier(0.5)
          }
          className={
            speedMultiplier === 0.5
              ? "active"
              : ""
          }
        >
          0.5×
        </button>

        <button
          onClick={() =>
            setSpeedMultiplier(1)
          }
          className={
            speedMultiplier === 1
              ? "active"
              : ""
          }
        >
          1×
        </button>

        <button
          onClick={() =>
            setSpeedMultiplier(2)
          }
          className={
            speedMultiplier === 2
              ? "active"
              : ""
          }
        >
          2×
        </button>

        <button
          onClick={() =>
            setShowNames(!showNames)
          }
        >
          {showNames
            ? "Hide Names"
            : "Show Names"}
        </button>

      </div>

      {/* =====================================
          PLANET INFORMATION
      ===================================== */}

      {selectedPlanet && (
        <>

          {/* RIGHT DETAILED INFO */}

          <div className="planet-details">

            <button
              className="planet-details-close"
              onClick={() =>
                setSelectedPlanet(null)
              }
            >
              ×
            </button>

            <div className="planet-details-visual">

              <div
                className="planet-details-planet"
                style={{
                  background:
                    selectedPlanet.color,
                }}
              />

            </div>

            <div className="planet-details-label">
              SOLARIS / PLANET
            </div>

            <h2>
              {selectedPlanet.name}
            </h2>

            <div className="planet-details-type">
              SOLAR SYSTEM EXPLORATION
            </div>

            <p>
              {selectedPlanet.description}
            </p>

            <div className="planet-details-divider" />

            <div className="planet-detail-row">

              <span>QUICK FACT</span>

              <strong>
                {selectedPlanet.facts}
              </strong>

            </div>
            <button
  className="planet-details-explore"
  onClick={() => {
    window.location.href = `/planet/${selectedPlanet.name.toLowerCase()}`;
  }}
>
  Explore {selectedPlanet.name}
</button>

          </div>
        </>
      )}
    
    </div>
    {/* ABOUT SOLARIS */}
<section className="solar-about">

  <div className="about-label">
    ABOUT SOLARIS
  </div>

  <h2>
    Explore the Solar System.
  </h2>

  <p>
    Discover planets, explore their worlds,
    and begin your journey through space.
  </p>

  <div className="about-cta">
    ✦ Click any planet to begin ✦
  </div>

</section>
</>
  );

}

export default SolarSystem;