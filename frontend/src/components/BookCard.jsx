import "./BookCard.css";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="card">
      <div className="cover">
        <img src={book.imageUrl} alt={book.title} />
      </div>

      <div className="metadata">
        <h2 className="title">{book.title}</h2>
        <h3 className="author">{book.author}</h3>
        <p className="availability">
          {book.borrowedByUserId ? "Borrowed" : "Available"}
        </p>
      </div>
    </Link>
  );
}
