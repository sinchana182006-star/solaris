import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

  function MainLayout() {
  const token = localStorage.getItem("solarisToken");
  const [menuOpen, setMenuOpen] = useState(false);

if (!token) {
  return <Navigate to="/login" replace />;
}
  return (
    <div className="main-layout">
      <header className="topbar">
        <div className="brand">
          <div className="logo">SOLARIS</div>
          <div className="tagline">Explore • Learn • Discover</div>
        </div>

      <nav className={`topbar-nav ${menuOpen ? "mobile-open" : ""}`}>
  <NavLink
    to="/home"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/missions"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    Missions
  </NavLink>

  <NavLink
    to="/quiz"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    Quiz
  </NavLink>

  <NavLink
  to="/cosmic-lens"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  Cosmic Lens
</NavLink>

  <NavLink
    to="/profile"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    👤 Profile
  </NavLink>
  <button
  className="mobile-menu-button"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>
</nav>
      </header>

      <main className="hero-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;