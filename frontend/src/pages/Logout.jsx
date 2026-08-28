import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authApi";
import "./Logout.css";

export default function Logout({ setUser }) {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await logoutUser();

    if (response.ok) {
      setUser(null);
      alert("Logout successful.");
      navigate("/");
    } else {
      alert("Failed to logout.");
    }
  }

  return (
    <div className="logout-page">
      <div className="logout-card">
        <h1 className="logout-title">Log out</h1>
        <p className="logout-text">Are you sure you want to log out from the Library?</p>
        <button className="logout-button" onClick={handleLogout}>Yes, log out</button>
      </div>
    </div>
  );
}
