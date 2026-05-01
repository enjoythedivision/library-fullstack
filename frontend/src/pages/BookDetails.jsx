import { useParams } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails({ books, onToggleAvailability }) {
  const { id } = useParams();

  const book = books.find((b) => b.id === Number(id));

  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <div
        className="bookHero"
        style={{ backgroundImage: `url(${book.photo})` }}
      >
        <div className="overlay">
          <div className="container">
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
          </div>
        </div>
      </div>
      <p>{book.isAvailable ? "Available" : "Borrowed"}</p>{" "}
      <button onClick={() => onToggleAvailability(book.id)}>
        {book.isAvailable ? "Borrow" : "Return"}
      </button>
      <p className="bookSummary">{book.summary}</p>
    </div>
  );
}
