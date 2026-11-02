import BookCard from "./BookCard";
import "./BookGrid.css";

export default function BookGrid({ books }) {
  return (
    <div className="bookGrid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
}
