import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookDetails from "../pages/books/BookDetails";
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";
import DeleteBook from "../pages/books/DeleteBook";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Logout from "../pages/auth/Logout";
import Favorites from "../pages/books/Favorites";

export default function AppRoutes({
  favorites,
  handleAddFavorite,
  handleRemoveFavorite,
  location,
  books,
  booksLoading,
  booksError,
  user,
  isAdmin,
  handleBorrow,
  handleReturn,
  refreshBooks,
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
      <Route
        path="/books/:id"
        element={
          <BookDetails
            favorites={favorites}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
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
        element={<AddBook refreshBooks={refreshBooks} />}
      />
      <Route
        path="/books/:id/edit"
        element={
          <EditBook
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
            refreshBooks={refreshBooks}
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
            refreshBooks={refreshBooks}
          />
        }
      />
      <Route
        path="/favorites"
        element={
          <Favorites
            favorites={favorites}
            handleRemoveFavorite={handleRemoveFavorite}
            user={user}
          />
        }
      />
      <Route
        path="/login"
        element={<Login fetchCurrentUser={fetchCurrentUser} refreshBooks={refreshBooks} />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/logout"
        element={<Logout setUser={setUser} refreshBooks={refreshBooks} />}
      />
    </Routes>
  );
}
