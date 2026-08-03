import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails({ books, onToggleAvailability }) {
  const { id } = useParams();

  const book = books.find((b) => b.id === Number(id));

  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <div
        className="bookHero"
        style={{ backgroundImage: `url(${book.imageUrl})` }}
      >
        <div className="overlay">
          <div className="container">
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
          </div>
        </div>
      </div>
      <div className="bookNav">
        <div className="bookLeft">
          <Link to="/">← Back to books</Link>
        </div>

        <div className="bookRight">
          <p>{book.isAvailable ? "Available" : "Borrowed"}</p>
          <button onClick={() => onToggleAvailability(book.id)}>
            {book.isAvailable ? "Borrow" : "Return"}
          </button>
          <Link to={`/books/${book.id}/edit`}>Edit Book</Link>
        </div>
      </div>

      <p className="bookSummary">{book.description}</p>
    </div>
  );
}
