import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../services/authApi";

export default function Login({ fetchCurrentUser, fetchBooks }) {
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
      const response = await loginUser({ email, password });
      if (!response.ok) {
        setError("Check your email and password and try again.");
        return;
      }

      let notice = "Signed in successfully.";
      try {
        await fetchCurrentUser();
        await fetchBooks();
      } catch {
        notice = "You're signed in, but the library could not refresh. Please reload the page.";
      }
      navigate("/", { state: { notice } });
    } catch {
      setError("Unable to connect. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign in</h1>
        <p className="page-note">Sign in to borrow and return books.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="field">
            <label className="field-label" htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              className="auth-input"
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
              className="auth-input"
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
