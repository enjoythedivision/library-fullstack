import "./BookCard.css";

export default function BookCard({ book }) {
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
      </div>
    </div>
  );
}