import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default function BookList({ books }) {
  const handleClick = async (id) => {
    const ref = doc(db, "posts", id);
    deleteDoc(ref);
  };
  // {//onClick={() => handleClick(book.id)}>
  return (
    <div className="book-list">
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <img src={book.photoUrl} />
            <p className="name">{book.title}</p>
            <button onClick={() => handleClick(book.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
