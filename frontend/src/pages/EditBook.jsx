import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BookForm.css";
import { editBook } from "../services/booksApi";

export default function EditBook({ books, fetchBooks }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const bookToEdit = books.find((b) => b.id === Number(id));

  const [title, setTitle] = useState(bookToEdit.title);
  const [author, setAuthor] = useState(bookToEdit.author);
  const [description, setDescription] = useState(bookToEdit.description);
  const [isAvailable, setIsAvailable] = useState(bookToEdit.isAvailable);

  async function handleEdit(event) {
    event.preventDefault();

    const editedBook = {
      ...bookToEdit,
      title,
      description,
      author
    };

    const response = await editBook(id, editedBook);

    if (response.ok) {
      await fetchBooks();
      alert("Book updated successfully.");
      navigate(`/books/${id}`);
    } else {
      alert("Failed to edit book.");
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Edit book details</h1>
        <form className="form-fields" onSubmit={handleEdit}>
          <input
            className="form-input"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="form-input"
            type="text"
            value={author}
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="form-textarea"
            value={description}
            placeholder="Book description..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-row">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
              Available to borrow
            </label>
          </div>
          <div className="form-actions">
            <button className="form-button" type="submit">
              Save Changes
            </button>
            <Link className="action-button" to={`/books/${id}`}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
