import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails({
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
  const [feedback, setFeedback] = useState(null);
  const [failedImageUrl, setFailedImageUrl] = useState(null);
  const book = books.find((book) => book.id === Number(id));

  if (!book && booksLoading) return <p className="page-note">Loading this book...</p>;
  if (!book && booksError) return <p className="page-note">Unable to load this book. Please try again.</p>;
  if (!book) {
    return (
      <section className="book-details-empty">
        <h1>Book not found</h1>
        <p className="page-note">This book may have been removed from the library.</p>
        <Link className="button button-secondary" to="/">Back to books</Link>
      </section>
    );
  }

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
    setFeedback(null);

    try {
      const result = await (action === "borrow" ? onBorrow(book.id) : onReturn(book.id));
      setFeedback(result);
    } catch {
      setFeedback({ ok: false, message: "We couldn't update this loan. Please try again." });
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <section className="book-details-page" aria-labelledby="book-title">
      <Link className="book-details-back" to="/">← Back to books</Link>

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
          <h1 id="book-title">{book.title}</h1>
          <p className="book-details-author">by {book.author}</p>
          <p className="book-availability">{statusText}</p>

          <div className="book-details-loan">
            <div className="book-details-actions">
              {!user ? (
                <Link className="button button-primary" to="/login">Log in to borrow</Link>
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
            </div>

            {feedback && (
              <p
                className={`feedback ${feedback.ok ? "feedback-success" : "feedback-error"}`}
                role={feedback.ok ? "status" : "alert"}
              >
                {feedback.message}
              </p>
            )}
          </div>

          <div className="book-details-description">
            <h2>About this book</h2>
            <p>{book.description || "No description available."}</p>
          </div>

          {user && isAdmin && (
            <div className="book-details-management">
              <div className="book-details-actions">
                <Link className="button button-secondary" to={`/books/${book.id}/edit`}>Edit book</Link>
                <Link className="button button-danger" to={`/books/${book.id}/delete`}>Delete book</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
