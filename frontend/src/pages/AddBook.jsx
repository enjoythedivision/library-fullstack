import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();
    const newBook = { title, author, description, isAvailable: true };
    const response = await fetch(`http://localhost:5038/api/Books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setDescription("");
      alert("Book added successfully.");
      navigate(`/`);
    } else {
      alert("Failed to add book.");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={author}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Book description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </>
  );
}
