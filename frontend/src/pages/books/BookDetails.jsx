import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import "./BookDetails.css";

export default function BookDetails({
  favorites,
  handleAddFavorite,
  handleRemoveFavorite,
  books,
  booksLoading,
  booksError,
  user,
  onBorrow,
  onReturn,
  isAdmin,
}) {
  const { id } = useParams();
  const [pendingAction, setPendingAction] = useState(null);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [failedImageUrl, setFailedImageUrl] = useState(null);
  const book = books.find((book) => book.id === Number(id));

  if (!book && booksLoading)
    return <p className="page-note">Loading this book...</p>;
  if (!book && booksError)
    return (
      <p className="page-note">Unable to load this book. Please try again.</p>
    );
  if (!book) {
    return (
      <section className="book-details-empty">
        <h1>Book not found</h1>
        <p className="page-note">
          This book may have been removed from the library.
        </p>
        <Link className="button button-secondary" to="/">
          Back to books
        </Link>
      </section>
    );
  }

  const isFavorite = favorites.some((f) => f.id === book.id);
  const isBorrowed = Boolean(book.borrowedByUserId);
  const isBorrowedByMe = Boolean(user && book.isBorrowedByMe);
  const statusText = isBorrowedByMe
    ? "Borrowed by you"
    : isBorrowed
      ? "Borrowed"
      : "Available";
  const showCover = book.imageUrl && book.imageUrl !== failedImageUrl;

  async function handleLoanAction(action) {
    setPendingAction(action);
    setMessage("");
    setActionError("");

    try {
      if (action === "borrow") {
        await onBorrow(book.id);
        setMessage("Book borrowed successfully.");
      } else {
        await onReturn(book.id);
        setMessage("Book returned successfully.");
      }
    } catch (error) {
      setActionError(
        error.message || "We couldn't update this loan. Please try again.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <section className="book-details-page">
      <Link className="book-details-back" to="/">
        ← Back to books
      </Link>

      <div className="book-details-layout">
        <div className="book-details-cover">
          {showCover ? (
            <img
              src={book.imageUrl}
              alt={`${book.title} cover`}
              onError={() => setFailedImageUrl(book.imageUrl)}
            />
          ) : (
            <div className="book-details-cover-fallback">
              <p>No cover available.</p>
            </div>
          )}
        </div>

        <div className="book-details-info">
          <h1>{book.title}</h1>
          <p className="book-details-author">by {book.author}</p>
          <p className="book-availability">{statusText}</p>

          <div className="book-details-loan">
            <div className="book-details-actions">
              {!user ? (
                <Link className="button button-primary" to="/login">
                  Log in to borrow
                </Link>
              ) : isBorrowedByMe ? (
                <button
                  className="button button-primary"
                  onClick={() => handleLoanAction("return")}
                  disabled={Boolean(pendingAction)}
                >
                  {pendingAction ? "Updating loan..." : "Return book"}
                </button>
              ) : !isBorrowed ? (
                <button
                  className="button button-primary"
                  onClick={() => handleLoanAction("borrow")}
                  disabled={Boolean(pendingAction)}
                >
                  {pendingAction ? "Updating loan..." : "Borrow book"}
                </button>
              ) : (
                <p className="page-note">Borrowed by another user.</p>
              )}
              <button
                type="button"
                className="button button-secondary book-favorite-button"
                aria-label="Add to favorites"
                title="Add to favorites"
                onClick={async () => {
                  try {
                    if (isFavorite) {
                      await handleRemoveFavorite(book.id);
                    } else {
                      await handleAddFavorite(book.id);
                    }
                  } catch (error) {
                    setActionError(error.message);
                  }
                }}
              >
                <Heart size={22} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <p>{isFavorite ? "Στα αγαπημένα" : "Εκτός αγαπημένων"}</p>
            </div>

            {message && <p className="feedback feedback-success">{message}</p>}
            {actionError && (
              <p className="feedback feedback-error">{actionError}</p>
            )}
          </div>

          <div className="book-details-description">
            <h2>About this book</h2>
            <p>{book.description || "No description available."}</p>
          </div>

          {user && isAdmin && (
            <div className="book-details-management">
              <div className="book-details-actions">
                <Link
                  className="button button-secondary"
                  to={`/books/${book.id}/edit`}
                >
                  Edit book
                </Link>
                <Link
                  className="button button-danger"
                  to={`/books/${book.id}/delete`}
                >
                  Delete book
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
