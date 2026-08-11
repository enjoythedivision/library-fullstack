import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookForm.css";

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
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Add a new book</h1>
        <form className="form-fields" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="form-input"
            type="text"
            value={author}
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="form-textarea"
            value={description}
            placeholder="Book description..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="form-button" type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}
