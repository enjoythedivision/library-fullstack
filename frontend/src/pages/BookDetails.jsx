import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";
import { useEffect, useState } from "react";
import { getBookById } from "../services/booksApi";

export default function BookDetails({ user, onBorrow, onReturn, isAdmin }) {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id)
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, [id]);

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
          {user ? (
            <>
              <p>{book.borrowedByUserId ? "Borrowed" : "Available"}</p>

              {book.borrowedByUserId ? (
                book.isBorrowedByMe ? (
                  <button onClick={() => onReturn(book.id)}>Return</button>
                ) : (
                  <p>Borrowed by someone else.</p>
                )
              ) : (
                <button onClick={() => onBorrow(book.id)}>Borrow</button>
              )}
              {isAdmin && (
                <>
                  <Link to={`/books/${book.id}/edit`}>Edit Book</Link>
                  <Link to={`/books/${book.id}/delete`}>Delete Book</Link>
                </>
              )}
            </>
          ) : (
            <button>
              <Link to="/login">Log in to borrow books.</Link>
            </button>
          )}
        </div>
      </div>

      <p className="bookSummary">{book.description}</p>
    </div>
  );
}
