import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../services/authApi";
import "./Auth.css";

export default function Logout({ setUser, setFavorites, refreshBooks }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      await logoutUser();

      setUser(null);
      setFavorites([]);
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
        <h1 className="form-title">Sign out</h1>
        <p className="logout-text">Are you sure you want to sign out?</p>
        {error && <p className="feedback feedback-error">{error}</p>}
        <div className="logout-actions">
          <button className="button button-primary" onClick={handleLogout} disabled={isSubmitting}>
            {isSubmitting ? "Signing out…" : "Sign out"}
          </button>
          <Link className="button button-secondary" to="/">Cancel</Link>
        </div>
      </div>
    </section>
  );
}
