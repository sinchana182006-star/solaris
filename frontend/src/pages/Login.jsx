import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Auth.css";
import loginSpace from "../assets/login-space.png";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("solarisToken", data.token);
      localStorage.setItem("solarisUser", JSON.stringify(data.user));

      navigate("/home");
    } catch (error) {
      setMessage(error.message || "Login failed ❌");
    }
  };

  return (
    <div
  className="auth-page auth-login"
  style={{
    backgroundImage: `url(${loginSpace})`,
  }}
>
      <div className="auth-orbit"></div>

      <div className="login-earth"></div>
      <div className="login-moon"></div>

      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo">SOLARIS</div>

          <div className="auth-tagline">
            Explore • Learn • Discover
          </div>
        </div>

        <div className="auth-card">
          <h1 className="auth-title">
            Welcome Back, Explorer 🌌
          </h1>

          <p className="auth-subtitle">
            Continue your journey through the cosmos.
          </p>

          <form
            onSubmit={handleLogin}
            className="auth-form"
          >
            <div className="auth-field">
              <label className="auth-label">
                Email
              </label>

              <input
                className="auth-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">
                Password
              </label>

              <input
                className="auth-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="auth-button"
              type="submit"
            >
              ✦ ENTER SOLARIS ✦
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;