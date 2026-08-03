import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditBook({ books }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const bookToEdit = books.find((b) => b.id === Number(id));

  async function handleEdit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:5038/api/Books`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToEdit),
    });

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setDescription("");
    } else {
      alert("Failed to edit book.");
    }
  }

  return (
    <>
      <form onSubmit={handleEdit}>
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
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}
