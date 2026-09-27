import { useNavigate } from "react-router-dom";

const missions = [
  {
    name: "Voyager",
    agency: "NASA",
    year: "1977",
    description:
      "A legendary pair of spacecraft exploring the outer Solar System and interstellar space.",
  },
  {
    name: "Apollo",
    agency: "NASA",
    year: "1969",
    description:
      "The historic program that carried humans to the Moon.",
  },
  {
    name: "Cassini",
    agency: "NASA / ESA / ASI",
    year: "1997",
    description:
      "A mission that transformed our understanding of Saturn and its moons.",
  },
  {
    name: "James Webb",
    agency: "NASA / ESA / CSA",
    year: "2021",
    description:
      "A powerful space telescope studying the universe in infrared light.",
  },
  {
    name: "Mars Missions",
    agency: "Multiple Agencies",
    year: "1960s–Present",
    description:
      "Decades of robotic exploration studying the surface, atmosphere, and history of Mars.",
  },
];

function Missions() {
  const navigate = useNavigate();

  return (
    <div className="missions-page">
      

      <main className="missions-main">
        <div className="missions-title">
          <p>SOLARIS / EXPLORATION</p>
          <h1>Space Missions</h1>
          <span>
            Discover the missions that expanded humanity's
            understanding of space.
          </span>
        </div>

        <section className="missions-grid">
          {missions.map((mission) => (
            <article
              className="mission-card"
              key={mission.name}
            >
              <div className="mission-icon">✦</div>

              <p className="mission-year">
                {mission.year}
              </p>

              <h2>{mission.name}</h2>

              <p className="mission-agency">
                {mission.agency}
              </p>

              <p className="mission-description">
                {mission.description}
              </p>

              <button
  onClick={() =>
    navigate(
      `/mission/${mission.name
        .toLowerCase()
        .replaceAll(" ", "-")}`
    )
  }
>
  Explore Mission →
</button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Missions;