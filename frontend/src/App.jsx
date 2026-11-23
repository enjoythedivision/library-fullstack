import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLocation } from "react-router-dom";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./services/favoritesApi";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { getBooks, borrowBook, returnBook } from "./services/booksApi";
import { getCurrentUser, getAdminStatus } from "./services/authApi";

function App() {
  const [user, setUser] = useState(undefined);
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesError, setFavoritesError] = useState("");
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  async function refreshBooks() {
    setBooksLoading(true);
    setBooksError("");

    try {
      setBooks(await getBooks());
    } catch {
      setBooksError("We couldn't refresh the collection. Please try again.");
    } finally {
      setBooksLoading(false);
    }
  }

  async function handleBorrow(bookId) {
    try {
      await borrowBook(bookId);
    } finally {
      await refreshBooks();
    }
  }

  async function handleReturn(bookId) {
    try {
      await returnBook(bookId);
    } finally {
      await refreshBooks();
    }
  }

  async function fetchCurrentUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      await refreshFavorites();
    } catch {
      setUser(null);
      setFavorites([]);
    }
  }

  async function checkIsAdmin() {
    try {
      const data = await getAdminStatus();
      setIsAdmin(data.isAdmin);
    } catch {
      setIsAdmin(false);
    }
  }

  async function refreshFavorites() {
    setFavoritesError("");

    try {
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    } catch (error) {
      setFavoritesError(error.message);
    }
  }

  async function handleAddFavorite(bookId) {
    setFavoritesError("");

    try {
      await addFavorite(bookId);
      await refreshFavorites();
    } catch (error) {
      setFavoritesError(error.message);
    }
  }

  async function handleRemoveFavorite(bookId) {
    setFavoritesError("");

    try {
      await removeFavorite(bookId);
      await refreshFavorites();
    } catch (error) {
      setFavoritesError(error.message);
    }
  }

  useEffect(() => {
    refreshBooks();
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
    <div>
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
          {favoritesError && (
            <p className="feedback feedback-error" role="alert">
              {favoritesError}
            </p>
          )}
          {booksError && (
            <div className="feedback feedback-error collection-error">
              <p>{booksError}</p>
              <button
                className="button button-secondary"
                onClick={refreshBooks}
                disabled={booksLoading}
              >
                {booksLoading ? "Refreshing…" : "Try again"}
              </button>
            </div>
          )}
          <AppRoutes
            favorites={favorites}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
            location={location}
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            user={user}
            isAdmin={isAdmin}
            handleBorrow={handleBorrow}
            handleReturn={handleReturn}
            refreshBooks={refreshBooks}
            fetchCurrentUser={fetchCurrentUser}
            setUser={setUser}
            setFavorites={setFavorites}
          />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
