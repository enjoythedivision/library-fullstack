import { useState } from "react";
import BookGrid from "../components/books/BookGrid";
import SearchBar from "../components/books/SearchBar";

export default function Home({ books, booksError, user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const normalizedSearchTerm = searchTerm.toLowerCase();
  const filteredBooks = books.filter((book) => {
    const searchMatch =
      book.title.toLowerCase().includes(normalizedSearchTerm) ||
      book.author.toLowerCase().includes(normalizedSearchTerm);

    const availabilityMatch =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && !book.borrowedByUserId) ||
      (availabilityFilter === "borrowed" && book.borrowedByUserId);

    return searchMatch && availabilityMatch;
  });

  return (
    <section>
      <div className="catalog-intro">
        <div>
          <h1>Browse the library</h1>
          <p className="page-note">
            Browse titles, check availability, and borrow a book.
          </p>
        </div>
        <p className="catalog-total">{books.length} books</p>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
      />
      {booksError && books.length === 0 ? (
        <p className="empty-state page-note">Books couldn't load.</p>
      ) : filteredBooks.length === 0 ? (
        <p className="empty-state page-note">No books found.</p>
      ) : (
        <BookGrid books={filteredBooks} user={user} />
      )}
    </section>
  );
}
