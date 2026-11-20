import { API_URL } from "./apiConfig";

export async function loginUser(user) {
  const response = await fetch(`${API_URL}/login?useCookies=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Check your email and password and try again.");
  }
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("We couldn't sign you out. Please try again.");
  }
}

export async function registerUser(user) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    const message = result?.errors
      ? Object.values(result.errors).flat().join(" ")
      : "We couldn't create your account. Check your details and try again.";
    throw new Error(message);
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/manage/info`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load your account.");
  }

  return response.json();
}

export async function getAdminStatus() {
  const response = await fetch(`${API_URL}/is-admin`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to check admin status.");
  }

  return response.json();
}
