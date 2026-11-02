import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { registerUser } from "../../services/authApi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await registerUser({ email, password });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.errors
          ? Object.values(result.errors).flat().join(" ")
          : "We couldn't create your account. Check your details and try again.");
        return;
      }
      navigate("/login", { state: { notice: "Your account is ready. Sign in to start borrowing." } });
    } catch {
      setError("Unable to connect. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page" aria-labelledby="register-title">
      <div className="auth-card">
        <h1 id="register-title" className="auth-title">Create account</h1>
        <p className="page-note">Create an account to borrow books.</p>
        <form className="auth-form" onSubmit={handleRegister} aria-busy={isSubmitting}>
          <div className="field">
            <label className="field-label" htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              className="auth-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              className="auth-input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby="password-hint"
              minLength={6}
              required
            />
            <p id="password-hint" className="field-hint">
              Use at least 6 characters, with an uppercase letter, a lowercase letter, a number, and a symbol.
            </p>
          </div>
          {error && <p className="feedback feedback-error" role="alert">{error}</p>}
          <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="auth-footer">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
