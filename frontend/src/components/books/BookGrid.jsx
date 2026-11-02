import BookCard from "./BookCard";
import "./BookGrid.css";

export default function BookGrid({ books, user }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} user={user} />
      ))}
    </div>
  );
}
