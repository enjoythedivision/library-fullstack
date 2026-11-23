import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../services/authApi";

export default function Login({ fetchCurrentUser, refreshBooks }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      await loginUser({ email, password });

      await fetchCurrentUser();
      await refreshBooks();
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card auth-card">
        <h1 className="form-title">Sign in</h1>
        <p className="page-note">Sign in to borrow and return books.</p>
        <form className="form-fields" onSubmit={handleLogin}>
          <div className="field">
            <label className="field-label" htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              className="form-input"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              className="form-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <p className="feedback feedback-error">{error}</p>}
          <button className="button button-primary auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="auth-footer">
          Need an account? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
