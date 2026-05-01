import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import BookGrid from "./components/BookGrid";
import SearchBar from "./components/SearchBar";
import About from "./components/About";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Trainspotting",
      author: "Irvine Welsh",
      photo: "/trainspotting.jpg",
      isAvailable: true,
    },
    {
      id: 2,
      title: "Gemma",
      author: "Dimitris Liantinis",
      photo: "gemma.jpg",
      isAvailable: true,
    },
    {
      id: 3,
      title: "Letter to His Father",
      author: "Franz Kafka",
      photo: "letter.webp",
      isAvailable: false,
    },
    {
      id: 4,
      title: "The Trial",
      author: "Franz Kafka",
      photo: "trial.jpg",
      isAvailable: true,
    },
    {
      id: 5,
      title: "The Stranger",
      author: "Albert Camus",
      photo: "stranger.jpeg",
      isAvailable: true,
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      photo: "1984.jpeg",
      isAvailable: true,
    },
    {
      id: 7,
      title: "The Book Thief",
      author: "Markus Zusak",
      photo: "thief.jpg",
      isAvailable: true,
    },
    {
      id: 8,
      title: "Les Misérables",
      author: "Victor Hugo",
      photo: "lesmiz.jpeg",
      isAvailable: false,
    },
    {
      id: 9,
      title: "Notes from Underground",
      author: "Fyodor Dostoevsky",
      photo: "underground.jpeg",
      isAvailable: true,
    },
    {
      id: 10,
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      photo: "crime.jpg",
      isAvailable: true,
    },
    {
      id: 11,
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      photo: "karamazov.webp",
      isAvailable: false,
    },
    {
      id: 12,
      title: "The Name of the Rose",
      author: "Umberto Eco",
      photo: "rose.jpg",
      isAvailable: true,
    },
    {
      id: 13,
      title: "When Nietzsche Wept",
      author: "Irvin D. Yalom",
      photo: "nietzche.jpg",
      isAvailable: true,
    },
    {
      id: 14,
      title: "Manufacturing Consent",
      author: "Noam Chomsky",
      photo: "consent.jpg",
      isAvailable: false,
    },
  ]);

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

  function toggleAvailability(bookId) {
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, isAvailable: !book.isAvailable } : book
    );

    setBooks(updatedBooks);
  }

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
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;