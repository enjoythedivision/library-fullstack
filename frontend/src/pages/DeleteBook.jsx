import { useNavigate, useParams, Link } from "react-router-dom";

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
    <>
      <p>
        Are you sure you want to delete {bookToDelete.title} by {bookToDelete.author}?
      </p>
      <button onClick={handleDelete}>Yes, delete this book</button>
      <Link to={`/books/${id}`}>Cancel</Link>
    </>
  );
}
