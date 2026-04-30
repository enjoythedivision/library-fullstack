import { useState } from "react";
import "./App.css";

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
      title: "Γκέμμα",
      author: "Δημήτρης Λιαντίνης",
      photo: "gemma.jpg",
      isAvailable: true,
    },
    {
      id: 3,
      title: "Γράμμα στον Πατέρα",
      author: "Franz Kafka",
      photo: "letter_to_father.jpg",
      isAvailable: false,
    },
    {
      id: 4,
      title: "Η Δίκη",
      author: "Franz Kafka",
      photo: "trial.jpg",
      isAvailable: true,
    },
    {
      id: 5,
      title: "Ο Ξένος",
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
      title: "Η Κλέφτρα των Βιβλίων",
      author: "Markus Zusak",
      photo: "book_thief.jpg",
      isAvailable: true,
    },
    {
      id: 8,
      title: "Οι Άθλιοι",
      author: "Victor Hugo",
      photo: "les_miserables.jpg",
      isAvailable: false,
    },
    {
      id: 9,
      title: "Υπόγειο",
      author: "Fyodor Dostoevsky",
      photo: "notes_from_underground.jpg",
      isAvailable: true,
    },
    {
      id: 10,
      title: "Έγκλημα και Τιμωρία",
      author: "Fyodor Dostoevsky",
      photo: "crime_and_punishment.jpg",
      isAvailable: true,
    },
    {
      id: 11,
      title: "Αδελφοί Καραμαζόφ",
      author: "Fyodor Dostoevsky",
      photo: "karamazov.jpg",
      isAvailable: false,
    },
    {
      id: 12,
      title: "Το Όνομα του Ρόδου",
      author: "Umberto Eco",
      photo: "name_of_the_rose.jpg",
      isAvailable: true,
    },
    {
      id: 13,
      title: "Όταν Έκλαψε ο Νίτσε",
      author: "Irvin D. Yalom",
      photo: "nietzsche.jpg",
      isAvailable: true,
    },
    {
      id: 14,
      title: "Κατασκευή Συναίνεσης",
      author: "Noam Chomsky",
      photo: "manufacturing_consent.jpg",
      isAvailable: false,
    },
  ];

  return (
    <>
      <h1>hello world</h1>
    </>
  );
}

export default App;
