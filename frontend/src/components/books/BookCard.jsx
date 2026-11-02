import { useState } from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";

export default function BookCard({ book, user }) {
  const [failedImage, setFailedImage] = useState(null);
  const showImage = book.imageUrl && failedImage !== book.imageUrl;
  const borrowedByMe = user && book.isBorrowedByMe;
  const status = borrowedByMe ? "Borrowed by you" : book.borrowedByUserId ? "Borrowed" : "Available";

  return (
    <Link to={`/books/${book.id}`} className="book-card">
      <div className="book-card-cover">
        {showImage ? (
          <img src={book.imageUrl} alt={book.title} loading="lazy" onError={() => setFailedImage(book.imageUrl)} />
        ) : (
          <div className="book-cover-placeholder"><p>No cover available.</p></div>
        )}
      </div>
      <div className="book-card-metadata">
        <p className="book-card-author">{book.author}</p>
        <h2 className="book-card-title">{book.title}</h2>
        <p className="book-card-availability">{status}</p>
      </div>
    </Link>
  );
}
