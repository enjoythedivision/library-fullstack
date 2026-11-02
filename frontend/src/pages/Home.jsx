import BookGrid from "../components/books/BookGrid";
import SearchBar from "../components/books/SearchBar";

export default function Home({
  books,
  booksLoading,
  booksError,
  filteredBooks,
  user,
  searchTerm,
  setSearchTerm,
  availabilityFilter,
  setAvailabilityFilter,
}) {
  return (
    <section>
      <div className="catalog-intro">
        <div>
          <h1>Browse the library</h1>
          <p className="page-note">
            Browse titles, check availability, and borrow a book.
          </p>
        </div>
        {!booksLoading && (
          <p className="catalog-total">{books.length} books on the shelf</p>
        )}
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
      />
      <div className="catalog-results">
        <p>
          {booksLoading
            ? "Refreshing the collection…"
            : `Showing ${filteredBooks.length} of ${books.length} books`}
        </p>
      </div>
      {booksLoading && books.length === 0 ? (
        <p className="loading-state">Loading books…</p>
      ) : booksError && books.length === 0 ? (
        <div className="empty-state">
          <h2>Books couldn't load.</h2>
          <p className="page-note">Use the retry button above to reconnect.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state">
          <h2>{books.length === 0 ? "No books yet." : "No books found."}</h2>
          <p className="page-note">
            {books.length === 0
              ? "New additions will appear here."
              : "Try a different title, author, or availability filter."}
          </p>
        </div>
      ) : (
        <BookGrid books={filteredBooks} user={user} />
      )}
    </section>
  );
}
