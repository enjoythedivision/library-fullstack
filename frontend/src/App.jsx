import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLocation, Link } from "react-router-dom";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./services/favoritesApi";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { getBooks, borrowBook, returnBook } from "./services/booksApi";
import { getCurrentUser, getAdminStatus } from "./services/authApi";
import * as signalR from "@microsoft/signalr";
import { API_URL } from "./services/apiConfig";

function App() {
  const [user, setUser] = useState(undefined);
  const [notification, setNotification] = useState(null);
  const [books, setBooks] = useState([]);
  const [booksError, setBooksError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesError, setFavoritesError] = useState("");
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  async function refreshBooks() {
    setBooksError("");

    try {
      setBooks(await getBooks());
    } catch {
      setBooksError("We couldn't refresh the collection. Please try again.");
    }

    if (user) {
      await refreshFavorites();
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

  useEffect(() => {
    if (!user) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/Notifications`)
      .withAutomaticReconnect([0, 0, 10000])
      .build();

    async function start() {
      try {
        await connection.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log(err);
      }
    }

    connection.on("BookAvailable", (book) => {
      setNotification(
        <>
          Your favorite book{" "}
          <Link to={`/books/${book.bookId}`}>{book.title}</Link> is available
          again.
        </>,
      );
    });

    start();
    return () => {
      connection.stop().catch(console.error);
    };
  }, [user]);

  return (
    <div>
      <Header user={user} isAdmin={isAdmin} />

      {notification && (
        <div className="notification-toast" role="status">
          <p>{notification}</p>
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}

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
          <AppRoutes
            favoritesError={favoritesError}
            favorites={favorites}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
            location={location}
            books={books}
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
