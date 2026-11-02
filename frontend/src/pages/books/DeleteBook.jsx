import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./BookForm.css";
import { deleteBook } from "../../services/booksApi";

export default function DeleteBook({ books, booksLoading, booksError, fetchBooks }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookToDelete = books.find((book) => book.id === Number(id));

  if (booksLoading && !bookToDelete) return <p className="page-note" role="status">Loading book…</p>;
  if (!bookToDelete && booksError) return <p className="page-note">Book details could not be loaded.</p>;
  if (!bookToDelete) {
    return <div className="form-page"><div className="form-card"><h1 className="form-title">Book not found.</h1><Link className="button button-secondary" to="/">Back to books</Link></div></div>;
  }

  async function handleDelete() {
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await deleteBook(id);
      if (!response.ok) {
        setError(response.status === 403 || response.status === 401
          ? "You need to be signed in as an admin to delete books."
          : "We couldn't delete this book. Please try again.");
        return;
      }
      await fetchBooks();
      navigate("/", { state: { notice: "Book removed from the collection." } });
    } catch {
      setError("Unable to connect. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page" aria-labelledby="delete-book-title">
      <div className="form-card form-card-compact">
        <h1 id="delete-book-title" className="form-title">Delete book</h1>
        <p className="confirm-text">
          <strong>{bookToDelete.title}</strong> by {bookToDelete.author} will be removed from the collection. This cannot be undone.
        </p>
        {error && <p className="feedback feedback-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button className="button button-danger" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? "Removing book…" : "Delete book"}
          </button>
          <Link className="button button-secondary" to={`/books/${id}`}>Cancel</Link>
        </div>
      </div>
    </section>
  );
}
