import { useNavigate, Link } from "react-router-dom";

export default function Logout({setUser}) {
  const navigate = useNavigate();

  async function handleLogout(event) {
    const response = await fetch("http://localhost:5038/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    });

    if (response.ok) {
      setUser(null);
      alert("Logout successful.");
      navigate("/");
    } else {
      alert("Failed to logout.");
    }
  }

  return (
    <>
      <h1>Log out</h1> <p>Are you sure you want to log out from the Library?</p>
      <button onClick={handleLogout}>Yes, log out</button>
    </>
  );
}
