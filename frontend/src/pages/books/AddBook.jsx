import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./BookForm.css";
import { addBook } from "../../services/booksApi";

export default function AddBook({ fetchBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await addBook({ title: title.trim(), author: author.trim(), description });
      if (!response.ok) {
        setError(response.status === 403 || response.status === 401
          ? "You need to be signed in as an admin to add books."
          : "We couldn't add this book. Please check the details and try again.");
        return;
      }
      await fetchBooks();
      navigate("/", { state: { notice: "Book added to the collection." } });
    } catch {
      setError("Unable to connect. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card">
        <h1 className="form-title">Add a book</h1>
        <form className="form-fields" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="book-title">Title</label>
            <input
              id="book-title"
              name="title"
              className="form-input"
              value={title}
              placeholder="Book title"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="book-author">Author</label>
            <input
              id="book-author"
              name="author"
              className="form-input"
              value={author}
              placeholder="Author's name"
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="book-description">Description <span className="field-optional">(optional)</span></label>
            <textarea
              id="book-description"
              name="description"
              className="form-textarea"
              value={description}
              placeholder="Book description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          {error && <p className="feedback feedback-error">{error}</p>}
          <div className="form-actions">
            <button className="button button-primary" disabled={isSubmitting}>
              {isSubmitting ? "Adding book…" : "Add book"}
            </button>
            <Link className="button button-secondary" to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
