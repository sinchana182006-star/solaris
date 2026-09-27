import CosmicNotes from "./pages/CosmicNotes";
import SolarSystemPDF from "./pages/SolarSystemPDF";
import QuizReview from "./pages/QuizReview";
import CosmicLens from "./pages/CosmicLens";
import MissionDetails from "./pages/MissionDetails";
import Missions from "./pages/Missions";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PlanetDetails from "./pages/PlanetDetails";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import Quiz from "./pages/quiz";
import Login from "./pages/Login";
import SolarSystem from "./components/SolarSystem";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login and Register stay separate */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Shared navigation layout */}
        <Route element={<MainLayout />}>

          {/* Home */}
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<SolarSystem />} />


          {/* Planet Details */}
          <Route
            path="/planet/:planetName"
            element={<PlanetDetails />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Missions */}
          <Route
            path="/missions"
            element={<Missions />}
          />

          {/* Mission Details */}
          <Route
            path="/mission/:missionName"
            element={<MissionDetails />}
          />

          {/* Quiz */}
          <Route
            path="/quiz"
            element={<Quiz />}
          />
          <Route
  path="/quiz/review"
  element={<QuizReview />}
/>
<Route
  path="/notes"
  element={<SolarSystemPDF />}
/>
         <Route
  path="/cosmic-lens"
  element={<CosmicLens />}
/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;