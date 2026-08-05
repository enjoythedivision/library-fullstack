import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBook({ books, fetchBooks }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const bookToDelete = books.find((b) => b.id === Number(id));

  if (!bookToDelete) return <p>Book not found.</p>;

  return (
    <>
      <p>Are you sure you want to delete {bookToDelete.title} by {bookToDelete.author}?</p>
    </>
  );
}
