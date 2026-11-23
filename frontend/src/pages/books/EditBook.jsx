import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BookForm.css";
import { editBook } from "../../services/booksApi";

export default function EditBook({ books, booksError, refreshBooks }) {
  const { id } = useParams();
  const bookToEdit = books.find((book) => book.id === Number(id));

  if (!bookToEdit && booksError) return <p className="page-note">Book details could not be loaded.</p>;
  if (!bookToEdit) {
    return <div className="form-page"><div className="form-card"><h1 className="form-title">Book not found.</h1><Link className="button button-secondary" to="/">Back to books</Link></div></div>;
  }

  return <EditBookForm key={bookToEdit.id} book={bookToEdit} refreshBooks={refreshBooks} />;
}

function EditBookForm({ book, refreshBooks }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description ?? "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEdit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      await editBook(book.id, {
        ...book,
        title: title.trim(),
        author: author.trim(),
        description,
      });

      await refreshBooks();
      navigate(`/books/${book.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card">
        <h1 className="form-title">Edit book details</h1>
        <form className="form-fields" onSubmit={handleEdit}>
          <div className="field">
            <label className="field-label" htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              name="title"
              className="form-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="edit-author">Author</label>
            <input
              id="edit-author"
              name="author"
              className="form-input"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="edit-description">Description <span className="field-optional">(optional)</span></label>
            <textarea
              id="edit-description"
              name="description"
              className="form-textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          {error && <p className="feedback feedback-error">{error}</p>}
          <div className="form-actions">
            <button className="button button-primary" disabled={isSubmitting}>
              Save changes
            </button>
            <Link className="button button-secondary" to={`/books/${book.id}`}>Cancel</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
