import { API_URL } from "./apiConfig";

async function getFavorites() {
  const response = await fetch(`${API_URL}/api/Favorites/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load favorites.");
  }

  return response.json();
}

async function addFavorite(bookId) {
  const response = await fetch(`${API_URL}/api/Favorites/${bookId}`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite.");
  }
}

async function removeFavorite(bookId) {
  const response = await fetch(`${API_URL}/api/Favorites/${bookId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to remove book from favorites.");
  }
}

export { getFavorites, addFavorite, removeFavorite };
