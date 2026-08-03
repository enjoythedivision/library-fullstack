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

function App() {
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

  async function toggleAvailability(bookId) {
    const bookToUpdate = books.find((b) => b.id === bookId);
    const newAvailability = !bookToUpdate.isAvailable;
    const updatedBook = {
      ...bookToUpdate,
      isAvailable: newAvailability,
    };

    const response = await fetch(`http://localhost:5038/api/Books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (response.ok) {
      setBooks(books.map((b) => (b.id === bookId ? updatedBook : b)));
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:5038/api/Books");
      const data = await response.json();

      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <Header />

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
                    <BookGrid
                      books={filteredBooks}
                      onToggleAvailability={toggleAvailability}
                    />
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
                  onToggleAvailability={toggleAvailability}
                />
              }
            />
            <Route path="/addbook" element={<AddBook />} />
            <Route
              path="/books/:id/edit"
              element={<EditBook books={books} />}
            />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
