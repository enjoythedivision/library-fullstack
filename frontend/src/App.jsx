import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

import { getBooks, borrowBook, returnBook } from "./services/booksApi";
import { getCurrentUser, getAdminStatus } from "./services/authApi";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const filteredBooks = books.filter((book) => {
    const searchMatch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const availabilityMatch =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && !book.borrowedByUserId) ||
      (availabilityFilter === "borrowed" && book.borrowedByUserId);

    return searchMatch && availabilityMatch;
  });

  const fetchBooks = async () => {
    setBooksLoading(true);
    setBooksError("");
    try {
      const response = await getBooks();
      if (!response.ok) throw new Error("Failed to load books.");
      setBooks(await response.json());
      return true;
    } catch {
      setBooksError("We couldn't refresh the collection. Please try again.");
      return false;
    } finally {
      setBooksLoading(false);
    }
  };

  async function handleBorrow(bookId) {
    try {
      const response = await borrowBook(bookId);
      if (!response.ok) {
        if (response.status === 400 || response.status === 409) {
          await fetchBooks();
          return { ok: false, message: "Another reader has already borrowed this book." };
        }
        return { ok: false, message: response.status === 401
          ? "Your session has expired. Please sign in again."
          : "We couldn't borrow this book. Please try again." };
      }
      const refreshed = await fetchBooks();
      return { ok: true, message: refreshed
        ? "Book borrowed successfully."
        : "Book borrowed. Reload the collection to see the latest status." };
    } catch {
      return { ok: false, message: "Unable to connect. Please try again in a moment." };
    }
  }

  async function handleReturn(bookId) {
    try {
      const response = await returnBook(bookId);
      if (!response.ok) {
        if (response.status === 403) {
          await fetchBooks();
          return { ok: false, message: "You can only return books borrowed by your account." };
        }
        return { ok: false, message: response.status === 401
          ? "Your session has expired. Please sign in again."
          : "We couldn't return this book. Please try again." };
      }
      const refreshed = await fetchBooks();
      return { ok: true, message: refreshed
        ? "Book returned successfully."
        : "Book returned. Reload the collection to see the latest status." };
    } catch {
      return { ok: false, message: "Unable to connect. Please try again in a moment." };
    }
  }

  async function fetchCurrentUser() {
    const response = await getCurrentUser();

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      setUser(null);
    }
  }

  async function checkIsAdmin() {
    const response = await getAdminStatus();

    if (response.ok) {
      const data = await response.json();
      setIsAdmin(data.isAdmin);
    } else {
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      checkIsAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <div className="container">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header user={user} isAdmin={isAdmin} />

      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          tabIndex={-1}
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
        >
          {location.state?.notice && (
            <p className="feedback feedback-success route-notice" role="status">{location.state.notice}</p>
          )}
          {booksError && (
            <div className="feedback feedback-error collection-error" role="alert">
              <p>{booksError}</p>
              <button className="button button-secondary" onClick={fetchBooks} disabled={booksLoading}>
                {booksLoading ? "Refreshing…" : "Try again"}
              </button>
            </div>
          )}
          <AppRoutes
            location={location}
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            filteredBooks={filteredBooks}
            user={user}
            isAdmin={isAdmin}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
            handleBorrow={handleBorrow}
            handleReturn={handleReturn}
            fetchBooks={fetchBooks}
            fetchCurrentUser={fetchCurrentUser}
            setUser={setUser}
          />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
