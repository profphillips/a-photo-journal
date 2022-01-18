import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function BookForm() {
  const [newBook, setNewBook] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = collection(db, "posts");

    await addDoc(ref, {
      title: newBook,
      uid: user.uid,
      photoUrl: photoUrl,
    });

    setNewBook("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new entry:</span>
        <span>
          <input
            required
            type="text"
            onChange={(e) => setNewBook(e.target.value)}
            value={newBook}
          />
        </span>
        <span>Photo URL:</span>
        <span>
          <input
            required
            type="text"
            onChange={(e) => setPhotoUrl(e.target.value)}
            value={photoUrl}
          />
        </span>
      </label>
      <button>Add</button>
    </form>
  );
}
