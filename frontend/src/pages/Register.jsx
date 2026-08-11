import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    const response = await fetch(
      "http://localhost:5038/register",
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
      navigate("/login");
    } else {
      alert("Failed to create account.");
    }
  }

  return (
    <>
      <h1>Create your account to borrow books from the library.</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Create account</button>
        <p>
          Already have an account? <Link to="/login">Sign in here.</Link>
        </p>
      </form>
    </>
  );
}
