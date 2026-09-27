import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/Auth.css";
import {useEffect} from "react";
function Register() {
  useEffect(() => {
  document.body.classList.add("register-page");

  return () => {
    document.body.classList.remove("register-page");
  };
}, []);

    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      setMessage(data.message || "Registration successful 🚀");

      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      setMessage(error.message || "Registration failed ❌");
    }
  };
return (
  <div className="auth-page auth-register">
    <div className="auth-orbit"></div>

    <div className="auth-container">
      <div className="auth-brand">
        <div className="auth-logo">SOLARIS</div>
        <div className="auth-tagline">
          Explore • Learn • Discover
        </div>
      </div>

      <div className="auth-card">
        <h1 className="auth-title">Welcome, Explorer 🚀</h1>

        <p className="auth-subtitle">
          Create your account and begin your journey through the cosmos.
        </p>

        <form onSubmit={handleRegister} className="auth-form">

          <div className="auth-field">
            <label className="auth-label">Name</label>

            <input
              className="auth-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>

            <input
              className="auth-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>

            <input
              className="auth-input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-button" type="submit">
            ✦ CREATE ACCOUNT ✦
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
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

export default Register;