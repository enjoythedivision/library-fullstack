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

