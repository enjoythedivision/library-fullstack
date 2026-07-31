import { useState, useEffect } from "react";

export default function EditBook() {

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
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}
