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
      await registerUser({ email, password });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card auth-card">
        <h1 className="form-title">Create account</h1>
        <p className="page-note">Create an account to borrow books.</p>
        <form className="form-fields" onSubmit={handleRegister}>
          <div className="field">
            <label className="field-label" htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              className="form-input"
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
              className="form-input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
            <p className="field-hint">
              Use at least 6 characters, with an uppercase letter, a lowercase letter, a number, and a symbol.
            </p>
          </div>
          {error && <p className="feedback feedback-error">{error}</p>}
          <button className="button button-primary auth-submit" disabled={isSubmitting}>
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
