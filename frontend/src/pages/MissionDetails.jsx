import { useNavigate, useParams } from "react-router-dom";

const missionData = {
  voyager: {
    name: "Voyager",
    year: "1977",
    agency: "NASA",
    description:
      "Voyager 1 and Voyager 2 are robotic spacecraft exploring the outer Solar System and interstellar space.",
  },

  apollo: {
    name: "Apollo",
    year: "1969",
    agency: "NASA",
    description:
      "The Apollo program carried humans to the Moon and became one of the most important achievements in space exploration.",
  },

  cassini: {
    name: "Cassini",
    year: "1997",
    agency: "NASA / ESA / ASI",
    description:
      "Cassini explored Saturn, its spectacular rings, and its many moons for more than a decade.",
  },

  "james-webb": {
    name: "James Webb",
    year: "2021",
    agency: "NASA / ESA / CSA",
    description:
      "The James Webb Space Telescope studies distant galaxies, stars, planets, and the early universe using infrared observations.",
  },

  "mars-missions": {
    name: "Mars Missions",
    year: "1960s–Present",
    agency: "Multiple Agencies",
    description:
      "Robotic missions to Mars have studied its surface, atmosphere, climate, geology, and potential habitability.",
  },
};

function MissionDetails() {
  const { missionName } = useParams();
  const navigate = useNavigate();

  const mission =
    missionData[missionName] || missionData.voyager;

  return (
    <div className="mission-details-page">
      

      <main className="mission-details-main">
        <button
          className="mission-back-button"
          onClick={() => navigate("/missions")}
        >
          ← Back to Missions
        </button>

        <p>SOLARIS / MISSION</p>

        <h1>{mission.name}</h1>

        <h3>{mission.agency}</h3>

        <div className="mission-detail-card">
          <span>LAUNCH / START</span>
          <strong>{mission.year}</strong>

          <h2>Mission Overview</h2>

          <p>{mission.description}</p>
        </div>
      </main>
    </div>
  );
}

export default MissionDetails;