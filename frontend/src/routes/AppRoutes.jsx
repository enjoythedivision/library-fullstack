import { Routes, Route } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";
import About from "../pages/About";
import BookDetails from "../pages/BookDetails";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import DeleteBook from "../pages/DeleteBook";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

export default function AppRoutes({
  location,
  books,
  booksLoading,
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
          <>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
            />

            {booksLoading ? (
              <p>Loading books...</p>
            ) : filteredBooks.length === 0 ? (
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
            booksLoading={booksLoading}
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
        element={<EditBook books={books} fetchBooks={fetchBooks} />}
      />
      <Route
        path="/books/:id/delete"
        element={<DeleteBook books={books} fetchBooks={fetchBooks} />}
      />
      <Route
        path="/login"
        element={<Login fetchCurrentUser={fetchCurrentUser} fetchBooks={fetchBooks} />}
      />
      <Route path="/register" element={<Register />}></Route>
      <Route path="/logout" element={<Logout setUser={setUser} fetchBooks={fetchBooks} />} />
    </Routes>
  );
}