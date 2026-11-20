import { API_URL } from "./apiConfig";

//CREATE BOOK (ADMIN ONLY)
export async function addBook(book) {
  const response = await fetch(`${API_URL}/api/Books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const message = response.status === 401 || response.status === 403
      ? "You need to be signed in as an admin to add books."
      : "We couldn't add this book. Please check the details and try again.";
    throw new Error(message);
  }
}

//READ BOOKS
export async function getBooks() {
  const response = await fetch(`${API_URL}/api/Books`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load books.");
  }

  return response.json();
}

//UPDATE BOOK (ADMIN ONLY)
export async function editBook(bookId, book) {
  const response = await fetch(`${API_URL}/api/Books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const message = response.status === 401 || response.status === 403
      ? "You need to be signed in as an admin to edit books."
      : "We couldn't save your changes. Please try again.";
    throw new Error(message);
  }
}

//DELETE BOOK (ADMIN ONLY)
export async function deleteBook(bookId) {
  const response = await fetch(`${API_URL}/api/Books/${bookId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const message = response.status === 401 || response.status === 403
      ? "You need to be signed in as an admin to delete books."
      : "We couldn't delete this book. Please try again.";
    throw new Error(message);
  }
}

//BORROW BOOK
export async function borrowBook(bookId) {
  const response = await fetch(`${API_URL}/api/Books/${bookId}/borrow`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const message = response.status === 401
      ? "Your session has expired. Please sign in again."
      : response.status === 400 || response.status === 409
        ? "Another reader has already borrowed this book."
        : "We couldn't borrow this book. Please try again.";
    throw new Error(message);
  }
}

//RETURN BOOK
export async function returnBook(bookId) {
  const response = await fetch(`${API_URL}/api/Books/${bookId}/return`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const message = response.status === 401
      ? "Your session has expired. Please sign in again."
      : response.status === 403
        ? "You can only return books borrowed by your account."
        : "We couldn't return this book. Please try again.";
    throw new Error(message);
  }
}
