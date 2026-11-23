import { Routes, Route, Navigate } from "react-router-dom";
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
  favoritesError,
  favorites,
  handleAddFavorite,
  handleRemoveFavorite,
  location,
  books,

  booksError,
  user,
  isAdmin,
  handleBorrow,
  handleReturn,
  refreshBooks,
  fetchCurrentUser,
  setUser,
  setFavorites,
}) {
  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <Home
            books={books}
            booksError={booksError}
            user={user}
          />
        }
      />
      <Route
        path="/books/:id"
        element={
          <BookDetails
            favoritesError={favoritesError}
            favorites={favorites}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
            books={books}
            booksError={booksError}
            user={user}
            handleBorrow={handleBorrow}
            handleReturn={handleReturn}
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
            booksError={booksError}
            refreshBooks={refreshBooks}
          />
        }
      />
      <Route
        path="/favorites"
        element={
          user === undefined ? null : user ? (
            <Favorites
              favoritesError={favoritesError}
              favorites={favorites}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          user === undefined ? null : user ? (
            <Navigate to="/" replace />
          ) : (
            <Login fetchCurrentUser={fetchCurrentUser} refreshBooks={refreshBooks} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/logout"
        element={
          <Logout
            setUser={setUser}
            setFavorites={setFavorites}
            refreshBooks={refreshBooks}
          />
        }
      />
    </Routes>
  );
}
