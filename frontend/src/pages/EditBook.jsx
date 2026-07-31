import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchBook() {
        const response = await fetch()
    }
  })

  async function handleEdit(event) {}

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
