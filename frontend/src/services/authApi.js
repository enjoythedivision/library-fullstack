const API_URL = "http://localhost:5038";

export async function loginUser(user) {
  return await fetch(`${API_URL}/login?useCookies=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
}

export async function logoutUser() {
  return await fetch("http://localhost:5038/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({}),
  });
}

export async function registerUser(user) {
  return await fetch("http://localhost:5038/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
}

export async function getCurrentUser() {
  return await fetch("http://localhost:5038/manage/info", {
    credentials: "include",
  });
}

export async function getAdminStatus() {
  return await fetch("http://localhost:5038/is-admin", {
    credentials: "include",
  });
}