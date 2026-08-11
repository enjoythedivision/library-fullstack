import { useNavigate, useParams, Link } from "react-router-dom";
import "./BookForm.css";

export default function DeleteBook({ books, fetchBooks }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const bookToDelete = books.find((b) => b.id === Number(id));

  if (!bookToDelete) return <p>Book not found.</p>;

  async function handleDelete(event) {
    const response = await fetch (`http://localhost:5038/api/Books/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        await fetchBooks();
        alert("Book deleted successfully.");
        navigate("/");
    } else {
        alert("Failed to delete book.");
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Delete book</h1>
        <p className="confirm-text">
          Are you sure you want to delete <strong>{bookToDelete.title}</strong> by <strong>{bookToDelete.author}</strong>?
        </p>
        <div className="form-actions">
          <button className="danger-button" onClick={handleDelete}>Yes, delete this book</button>
          <Link className="action-button" to={`/books/${id}`}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}
