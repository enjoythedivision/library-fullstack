import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BookGrid from "./components/BookGrid";
import SearchBar from "./components/SearchBar";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const location = useLocation();

  const filteredBooks = books.filter((book) => {
    const searchMatch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const availabilityMatch =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && book.isAvailable) ||
      (availabilityFilter === "borrowed" && !book.isAvailable);

    return searchMatch && availabilityMatch;
  });

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:5038/api/Books");
    const data = await response.json();

    setBooks(data);
  };

  async function handleBorrow(bookId) {
    const response = await fetch(
      `http://localhost:5038/api/Books/${bookId}/borrow`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (response.ok) {
      await fetchBooks();
    }
  }

  async function handleReturn(bookId) {
    const response = await fetch(
      `http://localhost:5038/api/Books/${bookId}/return`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (response.ok) {
      await fetchBooks();
    }
  }

  async function fetchCurrentUser() {
    const response = await fetch("http://localhost:5038/manage/info", {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="container">
      <Header user={user} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <>
                  <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    availabilityFilter={availabilityFilter}
                    setAvailabilityFilter={setAvailabilityFilter}
                  />

                  {filteredBooks.length === 0 ? (
                    <p>No books found.</p>
                  ) : (
                    <BookGrid books={filteredBooks} />
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/books/:id"
              element={
                <BookDetails
                  books={books}
                  user={user}
                  onBorrow={handleBorrow}
                  onReturn={handleReturn}
                />
              }
            />
            <Route path="/addbook" element={<AddBook />} />
            <Route
              path="/books/:id/edit"
              element={<EditBook books={books} fetchBooks={fetchBooks} />}
            />
            <Route
              path="/books/:id/delete"
              element={<DeleteBook books={books} fetchBooks={fetchBooks} />}
            />
            <Route
              path="/login"
              element={<Login fetchCurrentUser={fetchCurrentUser} />}
            />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout setUser={setUser} />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
