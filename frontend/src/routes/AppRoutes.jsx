import { Routes, Route } from "react-router-dom";
import BookGrid from "../components/books/BookGrid";
import SearchBar from "../components/books/SearchBar";
import About from "../pages/About";
import BookDetails from "../pages/books/BookDetails";
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";
import DeleteBook from "../pages/books/DeleteBook";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Logout from "../pages/auth/Logout";

export default function AppRoutes({
  location,
  books,
  booksLoading,
  booksError,
  filteredBooks,
  user,
  isAdmin,
  searchTerm,
  setSearchTerm,
  availabilityFilter,
  setAvailabilityFilter,
  handleBorrow,
  handleReturn,
  fetchBooks,
  fetchCurrentUser,
  setUser,
}) {
  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <section aria-labelledby="catalog-title">
            <div className="catalog-intro">
              <div>
                <h1 id="catalog-title">Browse the library</h1>
                <p className="page-note">Browse titles, check availability, and borrow a book.</p>
              </div>
              {!booksLoading && <p className="catalog-total">{books.length} books on the shelf</p>}
            </div>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
            />
            <div className="catalog-results" role="status" aria-live="polite">
              <p>{booksLoading ? "Refreshing the collection…" : `Showing ${filteredBooks.length} of ${books.length} books`}</p>
              <p>{books.filter((book) => !book.borrowedByUserId).length} available to borrow</p>
            </div>
            {booksLoading && books.length === 0 ? (
              <p className="loading-state" role="status">Loading books…</p>
            ) : booksError && books.length === 0 ? (
              <div className="empty-state"><h2>Books couldn't load.</h2><p className="page-note">Use the retry button above to reconnect.</p></div>
            ) : filteredBooks.length === 0 ? (
              <div className="empty-state">
                <h2>{books.length === 0 ? "No books yet." : "No books found."}</h2>
                <p className="page-note">{books.length === 0 ? "New additions will appear here." : "Try a different title, author, or availability filter."}</p>
                {(searchTerm || availabilityFilter !== "all") && (
                  <button className="button button-secondary" onClick={() => { setSearchTerm(""); setAvailabilityFilter("all"); }}>Clear filters</button>
                )}
              </div>
            ) : (
              <BookGrid books={filteredBooks} user={user} />
            )}
          </section>
        }
      />
      <Route path="/about" element={<About />} />
      <Route
        path="/books/:id"
        element={
          <BookDetails
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            user={user}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
            isAdmin={isAdmin}
          />
        }
      />
      <Route
        path="/addbook"
        element={<AddBook fetchBooks={fetchBooks} />}
      />
      <Route
        path="/books/:id/edit"
        element={<EditBook books={books} booksLoading={booksLoading} booksError={booksError} fetchBooks={fetchBooks} />}
      />
      <Route
        path="/books/:id/delete"
        element={<DeleteBook books={books} booksLoading={booksLoading} booksError={booksError} fetchBooks={fetchBooks} />}
      />
      <Route
        path="/login"
        element={<Login fetchCurrentUser={fetchCurrentUser} fetchBooks={fetchBooks} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout setUser={setUser} fetchBooks={fetchBooks} />} />
    </Routes>
  );
}
