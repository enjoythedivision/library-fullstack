import BookCard from "./BookCard";
import "./BookGrid.css";

export default function BookGrid({ books, onToggleAvailability }) {
  return (
    <div className="bookGrid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggleAvailability={onToggleAvailability}
        />
      ))}
    </div>
  );
}
