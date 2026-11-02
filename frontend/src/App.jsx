import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

import { getBooks, borrowBook, returnBook } from "./services/booksApi";
import { getCurrentUser, getAdminStatus } from "./services/authApi";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

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
    try {
      const response = await getBooks();
      if (!response.ok) throw new Error("Failed to load books.");
      const data = await response.json();
      setBooks(data);
    } finally {
      setBooksLoading(false);
    }
  };

  async function handleBorrow(bookId) {
    const response = await borrowBook(bookId);

    if (response.ok) {
      await fetchBooks();
    }
  }

  async function handleReturn(bookId) {
    const response = await returnBook(bookId);

    if (response.ok) {
      await fetchBooks();
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
      <Header user={user} isAdmin={isAdmin} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35 }}
        >
          <AppRoutes
            location={location}
            books={books}
            booksLoading={booksLoading}
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
