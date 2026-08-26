import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails({ books, user, onBorrow, onReturn }) {
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
          {user ? (
            <>
              <p>{book.isAvailable ? "Available" : "Borrowed"}</p>
              <button onClick={() => onBorrow(book.id)}>Borrow</button>
              <Link to={`/books/${book.id}/edit`}>Edit Book</Link>
              <Link to={`/books/${book.id}/delete`}>Delete Book</Link>
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
