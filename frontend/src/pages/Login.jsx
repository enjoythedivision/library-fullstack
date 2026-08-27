import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../services/authApi";

export default function Login({ fetchCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    const response = await loginUser(user);

    if (response.ok) {
      await fetchCurrentUser();
      alert("Welcome!");
      navigate("/");
    } else {
      alert("Failed to login.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back!</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="email"
            placeholder="mail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-button" type="submit">
            Log in
          </button>
          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one here.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
