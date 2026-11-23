import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./BookForm.css";
import { deleteBook } from "../../services/booksApi";

export default function DeleteBook({ books, booksError, refreshBooks }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookToDelete = books.find((book) => book.id === Number(id));

  if (!bookToDelete && booksError) return <p className="page-note">Book details could not be loaded.</p>;
  if (!bookToDelete) {
    return <div className="form-page"><div className="form-card"><h1 className="form-title">Book not found.</h1><Link className="button button-secondary" to="/">Back to books</Link></div></div>;
  }

  async function handleDelete() {
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      await deleteBook(id);

      await refreshBooks();
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card form-card-compact">
        <h1 className="form-title">Delete book</h1>
        <p className="confirm-text">
          <strong>{bookToDelete.title}</strong> by {bookToDelete.author} will be removed from the collection. This cannot be undone.
        </p>
        {error && <p className="feedback feedback-error">{error}</p>}
        <div className="form-actions">
          <button className="button button-danger" onClick={handleDelete} disabled={isSubmitting}>
            Delete book
          </button>
          <Link className="button button-secondary" to={`/books/${id}`}>Cancel</Link>
        </div>
      </div>
    </section>
  );
}
