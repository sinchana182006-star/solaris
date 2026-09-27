import { useParams, useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";
import { getCurrentUser, saveFavorites } from "../services/api";

const planetData = {
  mercury: {
    name: "Mercury",
    type: "THE SMALLEST PLANET",
    description:
      "Mercury is the smallest planet in the Solar System and the closest planet to the Sun.",
    distance: "57.9 million km",
    diameter: "4,879 km",
    gravity: "3.7 m/s²",
    day: "59 Earth days",
    year: "88 Earth days",
    moons: "0",
    temperature: "167°C",
  },

  venus: {
    name: "Venus",
    type: "THE HOTTEST PLANET",
    description:
      "Venus is a rocky world covered by a thick carbon-dioxide atmosphere and intense heat.",
    distance: "108.2 million km",
    diameter: "12,104 km",
    gravity: "8.87 m/s²",
    day: "243 Earth days",
    year: "225 Earth days",
    moons: "0",
    temperature: "464°C",
  },

  earth: {
    name: "Earth",
    type: "THE BLUE PLANET",
    description:
      "Earth is the third planet from the Sun and the only known planet to support life.",
    distance: "149.6 million km",
    diameter: "12,742 km",
    gravity: "9.81 m/s²",
    day: "24 hours",
    year: "365 days",
    moons: "1",
    temperature: "15°C",
  },

  mars: {
    name: "Mars",
    type: "THE RED PLANET",
    description:
      "Mars is a cold desert world known for its red surface, giant volcanoes, and ancient valleys.",
    distance: "227.9 million km",
    diameter: "6,779 km",
    gravity: "3.71 m/s²",
    day: "24.6 hours",
    year: "687 days",
    moons: "2",
    temperature: "-63°C",
  },

  jupiter: {
    name: "Jupiter",
    type: "THE GAS GIANT",
    description:
      "Jupiter is the largest planet in the Solar System and is famous for its enormous storms.",
    distance: "778.5 million km",
    diameter: "139,820 km",
    gravity: "24.79 m/s²",
    day: "9.9 hours",
    year: "11.86 years",
    moons: "95+",
    temperature: "-110°C",
  },

  saturn: {
    name: "Saturn",
    type: "THE RINGED PLANET",
    description:
      "Saturn is a gas giant surrounded by a spectacular system of bright icy rings.",
    distance: "1.43 billion km",
    diameter: "116,460 km",
    gravity: "10.44 m/s²",
    day: "10.7 hours",
    year: "29.5 years",
    moons: "140+",
    temperature: "-140°C",
  },

  uranus: {
    name: "Uranus",
    type: "THE ICE GIANT",
    description:
      "Uranus is an ice giant with a blue-green atmosphere and an extreme axial tilt.",
    distance: "2.87 billion km",
    diameter: "50,724 km",
    gravity: "8.69 m/s²",
    day: "17.2 hours",
    year: "84 years",
    moons: "28",
    temperature: "-195°C",
  },

  neptune: {
    name: "Neptune",
    type: "THE WINDIEST PLANET",
    description:
      "Neptune is a distant blue ice giant known for its powerful winds and storms.",
    distance: "4.50 billion km",
    diameter: "49,244 km",
    gravity: "11.15 m/s²",
    day: "16.1 hours",
    year: "165 years",
    moons: "16",
    temperature: "-200°C",
  },
};

function PlanetDetails() {
  const { planetName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
  const token = localStorage.getItem("solarisToken");

  if (!token) return;

  getCurrentUser()
    .then((data) => {
      if (data.user) {
        const favorites = data.user.favoritePlanets || [];

        setIsFavorite(
          favorites.includes(planetName?.toLowerCase())
        );
      }
    })
    .catch((error) => {
      console.error("Could not load user favorites:", error);
    });
}, [planetName]);

  const planet =
    planetData[planetName?.toLowerCase()] ||
    planetData.earth;

  return (
    <div className="planet-details-page">

     

      <main className="details-main">

        <button
          className="back-button"
          onClick={() => navigate("/home")}
        >
          ← Back to Solar System
        </button>

        <section className="planet-hero">

          <div className="planet-visual-area">
            <div
              className={`planet-visual planet-${planetName?.toLowerCase()}`}
            />

            <div className="planet-orbit-glow" />
          </div>

          <div className="planet-main-info">

            <div className="planet-label">
              SOLARIS / PLANET
            </div>

            <h1>{planet.name}</h1>

            <div className="planet-type">
              {planet.type}
            </div>

            <p className="planet-description">
              {planet.description}
            </p>

           <button
  className={`favorite-button ${isFavorite ? "favorited" : ""}`}
  onClick={async () => {
    const key = planetName?.toLowerCase();
    const token = localStorage.getItem("solarisToken");

    if (!token) {
      alert("Please login first 🚀");
      return;
    }

    try {
      const data = await getCurrentUser();

      const currentFavorites = data.user?.favoritePlanets || [];

      let updatedFavorites;

      if (currentFavorites.includes(key)) {
        updatedFavorites = currentFavorites.filter(
          (item) => item !== key
        );
        setIsFavorite(false);
      } else {
        updatedFavorites = [...currentFavorites, key];
        setIsFavorite(true);
      }

      await saveFavorites(updatedFavorites);
    } catch (error) {
      console.error("Could not update favorites:", error);
    }
  }}
>
  {isFavorite ? "♥ Added to Favorites" : "♡ Add to Favorites"}
</button>

          </div>
<div className="planet-stats">

  {activeTab === "Overview" && (
    <>
      <h3>OVERVIEW</h3>

      <h2>Discover {planet.name}</h2>

      <p>{planet.description}</p>

      <div className="stat-row">
        <span>Distance from Sun</span>
        <strong>{planet.distance}</strong>
      </div>

      <div className="stat-row">
        <span>Diameter</span>
        <strong>{planet.diameter}</strong>
      </div>
    </>
  )}

  {activeTab === "Structure" && (
    <>
      <h3>PLANET STRUCTURE</h3>

      <h2>Inside {planet.name}</h2>

      <div className="stat-row">
        <span>Core</span>
        <strong>Dense interior</strong>
      </div>

      <div className="stat-row">
        <span>Mantle</span>
        <strong>Rocky layer</strong>
      </div>

      <div className="stat-row">
        <span>Surface</span>
        <strong>Rocky terrain</strong>
      </div>

      <p>
        Explore the internal layers and physical structure
        of {planet.name}.
      </p>
    </>
  )}

  {activeTab === "Atmosphere" && (
    <>
      <h3>ATMOSPHERE</h3>

      <h2>{planet.name} Atmosphere</h2>

      <div className="stat-row">
        <span>Main Gas</span>
        <strong>Carbon Dioxide</strong>
      </div>

      <div className="stat-row">
        <span>Weather</span>
        <strong>Dust Storms</strong>
      </div>

      <p>
        Explore the gases, weather and atmospheric conditions
        of {planet.name}.
      </p>
    </>
  )}

  {activeTab === "Moons" && (
    <>
      <h3>NATURAL SATELLITES</h3>

      <h2>Moons of {planet.name}</h2>

      <div className="stat-row">
        <span>Known Moons</span>
        <strong>{planet.moons}</strong>
      </div>

      <p>
        Explore the natural satellites that orbit {planet.name}.
      </p>
    </>
  )}

  {activeTab === "Facts" && (
    <>
      <h3>INTERESTING FACTS</h3>

      <h2>Did You Know?</h2>

      <div className="stat-row">
        <span>Gravity</span>
        <strong>{planet.gravity}</strong>
      </div>

      <div className="stat-row">
        <span>Day Length</span>
        <strong>{planet.day}</strong>
      </div>

      <div className="stat-row">
        <span>Year Length</span>
        <strong>{planet.year}</strong>
      </div>

      <div className="stat-row">
        <span>Temperature</span>
        <strong>{planet.temperature}</strong>
      </div>
    </>
  )}

</div>
        </section>

        <section className="planet-tabs">

  {["Overview", "Structure", "Atmosphere", "Moons", "Facts"].map(
    (tab) => (
      <button
        key={tab}
        className={`tab ${activeTab === tab ? "active" : ""}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    )
  )}

</section>

      </main>
    </div>
  );
}

export default PlanetDetails;