import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditBook({ books }) {
  const { id } = useParams();

  const bookToEdit = books.find((b) => b.id === Number(id));
  const [title, setTitle] = useState(bookToEdit.title);
  const [author, setAuthor] = useState(bookToEdit.author);
  const [description, setDescription] = useState(bookToEdit.description);
  const [isAvailable, setIsAvailable] = useState(bookToEdit.isAvailable);

  async function handleEdit(event) {
    event.preventDefault();
    const editedBook = { ...bookToEdit, title, description, author, isAvailable };
    const response = await fetch(`http://localhost:5038/api/Books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBook),
    });

    if (!response.ok) {
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
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />{" "}
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}
