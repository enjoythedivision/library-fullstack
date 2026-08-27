const API_URL = "http://localhost:5038";

//CREATE BOOK (ADMIN ONLY)
export async function addBook(book) {
  return await fetch(`${API_URL}/api/Books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(book),
  });
}

//READ BOOKS
export async function getBooks() {
  return await fetch(`${API_URL}/api/Books`);
}

//UPDATE BOOK (ADMIN ONLY)
export async function editBook(bookId, book) {
  return await fetch(`${API_URL}/api/Books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(book),
  });
}

//DELETE BOOK (ADMIN ONLY)
export async function deleteBook(bookId) {
  return await fetch(`${API_URL}/api/Books/${bookId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

//BORROW BOOK
export async function borrowBook(bookId) {
  return await fetch(`${API_URL}/api/Books/${bookId}/borrow`, {
    method: "POST",
    credentials: "include",
  });
}

//RETURN BOOK
export async function returnBook(bookId) {
  return await fetch(`${API_URL}/api/Books/${bookId}/return`, {
    method: "POST",
    credentials: "include",
  });
}