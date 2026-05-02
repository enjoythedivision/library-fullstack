import "./BookCard.css";
import { Link } from "react-router-dom";

export default function BookCard({ book, onToggleAvailability }) {
  return (
    <Link to={`/books/${book.id}`} className="card">
      <div className="cover">
        <img src={book.photo} alt={book.title} />
      </div>

      <div className="metadata">
        <h2 className="title">{book.title}</h2>
        <h3 className="author">{book.author}</h3>
        <p className="availability">
          {book.isAvailable ? "Available" : "Borrowed"}
        </p>
        <button
          className="borrowBtn"
          onClick={(e) => {
            e.preventDefault(); // σταματάει το Link navigation
            onToggleAvailability(book.id);
          }}
        >
          {book.isAvailable ? "Borrow" : "Return"}
        </button>
      </div>
    </Link>
  );
}
