import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BookGrid from "./components/BookGrid";
import SearchBar from "./components/SearchBar";

function App() {
  const books = [
    {
      id: 1,
      title: "Trainspotting",
      author: "Irvine Welsh",
      photo: "trainspotting.jpg",
      isAvailable: true,
    },
    {
      id: 2,
      title: "Gemma",
      author: "Dimitris Liantinis",
      photo: "gemma.jpg",
      isAvailable: true,
    },
    {
      id: 3,
      title: "Letter to His Father",
      author: "Franz Kafka",
      photo: "letter_to_father.jpg",
      isAvailable: false,
    },
    {
      id: 4,
      title: "The Trial",
      author: "Franz Kafka",
      photo: "trial.jpg",
      isAvailable: true,
    },
    {
      id: 5,
      title: "The Stranger",
      author: "Albert Camus",
      photo: "stranger.jpg",
      isAvailable: true,
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      photo: "1984.jpg",
      isAvailable: true,
    },
    {
      id: 7,
      title: "The Book Thief",
      author: "Markus Zusak",
      photo: "book_thief.jpg",
      isAvailable: true,
    },
    {
      id: 8,
      title: "Les Misérables",
      author: "Victor Hugo",
      photo: "les_miserables.jpg",
      isAvailable: false,
    },
    {
      id: 9,
      title: "Notes from Underground",
      author: "Fyodor Dostoevsky",
      photo: "notes_from_underground.jpg",
      isAvailable: true,
    },
    {
      id: 10,
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      photo: "crime_and_punishment.jpg",
      isAvailable: true,
    },
    {
      id: 11,
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      photo: "karamazov.jpg",
      isAvailable: false,
    },
    {
      id: 12,
      title: "The Name of the Rose",
      author: "Umberto Eco",
      photo: "name_of_the_rose.jpg",
      isAvailable: true,
    },
    {
      id: 13,
      title: "When Nietzsche Wept",
      author: "Irvin D. Yalom",
      photo: "nietzsche.jpg",
      isAvailable: true,
    },
    {
      id: 14,
      title: "Manufacturing Consent",
      author: "Noam Chomsky",
      photo: "manufacturing_consent.jpg",
      isAvailable: false,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const filteredBooks = books.filter((book) => {
    const searchMatch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const availabilityMatch =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && book.isAvailable) ||
      (availabilityFilter === "borrowed" && !book.isAvailable);

    return searchMatch && availabilityMatch;
  });

  return (
    <div className="container">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
      />{" "}
      <BookGrid books={filteredBooks} />{" "}
    </div>
  );
}

export default App;
