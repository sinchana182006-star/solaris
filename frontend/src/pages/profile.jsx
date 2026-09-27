import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const planetData = {
  mercury: {
    name: "Mercury",
    emoji: "☿",
  },
  venus: {
    name: "Venus",
    emoji: "♀",
  },
  earth: {
    name: "Earth",
    emoji: "🌍",
  },
  mars: {
    name: "Mars",
    emoji: "🔴",
  },
  jupiter: {
    name: "Jupiter",
    emoji: "🟠",
  },
  saturn: {
    name: "Saturn",
    emoji: "🪐",
  },
  uranus: {
    name: "Uranus",
    emoji: "🔵",
  },
  neptune: {
    name: "Neptune",
    emoji: "🔵",
  },
};

function Profile() {
  const handleLogout = () => {
  localStorage.removeItem("solarisToken");
  localStorage.removeItem("solarisUser");
  window.location.href = "/login";
};


 const navigate = useNavigate();
const [favorites, setFavorites] = useState([]);
const [user, setUser] = useState(null);
const [quizResults, setQuizResults] = useState([]);
const [achievements, setAchievements] = useState([]);
useEffect(() => {
  const token = localStorage.getItem("solarisToken");

  if (!token) {
    return;
  }

  getCurrentUser()
    .then((data) => {
     if (data.user) {
  setUser(data.user);
  setFavorites(data.user.favoritePlanets || []);
  setQuizResults([]);
  setAchievements(data.user.achievements || []);
}
    })
    .catch((error) => {
      console.error("Could not load user:", error);
    });
}, []);

  return (
    <div className="profile-page">
      

      <main className="profile-main">
        <div className="profile-title">
  <p>SOLARIS / USER</p>

  <h1>My Profile</h1>

  <h3>Welcome, {user?.name || "Solaris User"} 🚀</h3>

  <p className="profile-email">{user?.email}</p>

  <span>Your space journey</span>
</div>

        <section className="favorites-section">
          <div className="section-heading">
            <div>
              <p>SAVED WORLDS</p>
              <h2>My Favorites</h2>
            </div>

            <span>{favorites.length} saved</span>
          </div>

          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <div>☆</div>
              <h3>No favorites yet</h3>
              <p>
                Explore the Solar System and save planets
                you want to remember.
              </p>

              <button onClick={() => navigate("/")}>
                Explore Planets
              </button>
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map((planetKey) => {
                const planet = planetData[planetKey];

                if (!planet) return null;

                return (
                  <div
                    className="favorite-card"
                    key={planetKey}
                  >
                    <div className="favorite-planet">
                      {planet.emoji}
                    </div>

                    <div>
                      <p>PLANET</p>
                      <h3>{planet.name}</h3>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/planet/${planetKey}`)
                      }
                    >
                      Explore →
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </section>
        <div className="profile-bottom-grid">
        <section className="progress-section">
  <div className="section-heading">
    <div>
      <p>QUIZ PROGRESS</p>
      <h2>My Progress</h2>
    </div>
  </div>

 <div className="progress-grid">
  <div className="progress-card">
    <span>QUIZZES COMPLETED</span>
    <strong>{user?.quizProgress?.quizzesCompleted || 0}</strong>
  </div>

  <div className="progress-card">
    <span>AVERAGE SCORE</span>
    <strong>{user?.quizProgress?.averageScore || 0}%</strong>
  </div>

  <div className="progress-card">
    <span>BEST SCORE</span>
    <strong>{user?.quizProgress?.bestScore || 0}%</strong>
  </div>
</div>
</section>

 {/* ACHIEVEMENTS */}
     <section className="achievements-section">
       <div className="section-heading">
         <div>
           <p>ACHIEVEMENTS</p>
           <h2>My Badges</h2>
         </div>
       </div>

       <div className="achievements-grid">
         {user?.quizProgress?.quizzesCompleted >= 1 && (
           <div className="achievement-card">
             <div className="achievement-icon">🚀</div>
             <h3>First Quiz</h3>
             <p>You completed your first quiz.</p>
           </div>
         )}

         {user?.quizProgress?.quizzesCompleted >= 5 && (
           <div className="achievement-card">
             <div className="achievement-icon">🌟</div>
             <h3>Quiz Explorer</h3>
             <p>You completed 5 quizzes.</p>
           </div>
         )}

         {favorites.length >= 3 && (
           <div className="achievement-card">
             <div className="achievement-icon">🪐</div>
             <h3>Planet Collector</h3>
             <p>You saved 3 planets.</p>
           </div>
         )}

         {user?.quizProgress?.bestScore === 100 && (
           <div className="achievement-card">

             <div className="achievement-icon">🏆</div>
             <h3>Perfect Score</h3>
             <p>You achieved 100% on a quiz.</p>
           </div>
         )}
       </div>
       <button onClick={handleLogout} className="logout-button">
  Logout
</button>
     </section>
     </div>
 </main>
    </div>
  );
}

export default Profile;