import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { db, storage } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function BookForm() {
  const [newItemText, setNewItemText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null)
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadPath = `photos/${user.uid}/${photo.name}`
    const storageRef = ref(storage, uploadPath)
    const img = await uploadBytes(storageRef, photo, 'data_url')
    const imgUrl = await getDownloadURL(img.ref)
    console.log(imgUrl)

    const myRef = collection(db, "posts");
    setNewItemText("");
    setPhoto(null)

    await addDoc(myRef, {
      title: newItemText,
      uid: user.uid,
      photoUrl: imgUrl,
    });


  };

  const handleFileChange = (e) => {
    setPhoto(null)
    let selected = e.target.files[0]
    console.log(selected)

    if (!selected) {
      setPhotoError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setPhotoError('Selected file must be an image')
      return
    }
    if (selected.size > 10000000) {
      setPhotoError('Image file size must be less than 100kb')
      return
    }

    setPhotoError(null)
    setPhoto(selected)
    console.log('thumbnail updated')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label><span>Add a new entry:</span>
        <input
          required
          type="text"
          onChange={(e) => setNewItemText(e.target.value)}
          value={newItemText}
        />
      </label>
      <label>
        <span>Photo:</span>
        <input
          required
          type="file"
          onChange={handleFileChange}
        // onChange={(e) => setPhotoUrl(e.target.value)}
        // value={photo}
        />
        {photoError && <div className="error">{photoError}</div>}
      </label>

      <button className="btn">Add</button>
    </form>
  );
}
