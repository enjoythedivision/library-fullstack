import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({fetchCurrentUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    const response = await fetch(
      "http://localhost:5038/login?useCookies=true",
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
      await fetchCurrentUser();
      alert("Welcome!");
      navigate("/");
    } else {
      alert("Failed to login.");
    }
  }

  return (
    <>
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="mail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
