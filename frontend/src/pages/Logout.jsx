import { useNavigate, Link } from "react-router-dom";

export default function Logout() {
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
      await fetchCurrentUser();
      alert("Welcome!");
      navigate("/");
    } else {
      alert("Failed to login.");
    }
  }

  return (
    <>
      <h1>Log out</h1> <p>Are you sure you want to log out from the Library?</p>
      <button onClick={handleLogout}>Yes, log out</button>
    </>
  );
}
