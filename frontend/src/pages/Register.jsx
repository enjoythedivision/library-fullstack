import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
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
        <p>Already have an account? <Link to="/login">Sign in here.</Link></p>
      </form>
    </>
  );
}
