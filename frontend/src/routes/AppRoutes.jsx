import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
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
  user,
  isAdmin,
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
          <Home
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            user={user}
          />
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
        element={
          <EditBook
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            fetchBooks={fetchBooks}
          />
        }
      />
      <Route
        path="/books/:id/delete"
        element={
          <DeleteBook
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            fetchBooks={fetchBooks}
          />
        }
      />
      <Route
        path="/login"
        element={<Login fetchCurrentUser={fetchCurrentUser} fetchBooks={fetchBooks} />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/logout"
        element={<Logout setUser={setUser} fetchBooks={fetchBooks} />}
      />
    </Routes>
  );
}
