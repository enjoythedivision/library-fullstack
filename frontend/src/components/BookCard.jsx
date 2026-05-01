import "./BookCard.css";

export default function BookCard({ book, onToggleAvailability }) {
  return (
    <div className="card">
      <div className="cover">
        <img src={book.photo} alt={book.title} />
      </div>

      <div className="metadata">
        <h2 className="title">{book.title}</h2>
        <h3 className="author">{book.author}</h3>
        <p className="availability">
          {book.isAvailable ? "Available" : "Borrowed"}
        </p>
        <button className="borrowBtn" onClick={() => onToggleAvailability(book.id) }>
           {book.isAvailable ? "Borrow" : "Return" }
        </button>
      </div>
    </div>
  );
}