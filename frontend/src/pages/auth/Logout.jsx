import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../services/authApi";
import "./Logout.css";

export default function Logout({ setUser, fetchBooks }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await logoutUser();
      if (!response.ok) {
        setError("We couldn't sign you out. Please try again.");
        return;
      }

      setUser(null);
      let notice = "You're signed out. You can still browse the collection.";
      try {
        await fetchBooks();
      } catch {
        notice = "You're signed out. Please reload the page to refresh the collection.";
      }
      navigate("/", { state: { notice } });
    } catch {
      setError("Unable to connect. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="logout-page" aria-labelledby="logout-title">
      <div className="logout-card">
        <h1 id="logout-title" className="logout-title">Sign out</h1>
        <p className="logout-text">Are you sure you want to sign out?</p>
        {error && <p className="feedback feedback-error" role="alert">{error}</p>}
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
