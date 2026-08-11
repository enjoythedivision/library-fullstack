import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    const response = await fetch(
      "http://localhost:5038/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      },
    );

    if (response.ok) {
      navigate("/login");
    } else {
      alert("Failed to create account.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create your account to borrow books from the library.</h1>
        <form className="auth-form" onSubmit={handleRegister}>
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
        <button className="auth-button" type="submit">Create account</button>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in here.</Link>
        </p>
      </form>
      </div>
    </div>
  );
}
