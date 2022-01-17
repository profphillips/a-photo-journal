import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAElZkG2UkNV5sEPxu6FKJeXSPEhm-vjO0",
  authDomain: "photojournaljp.firebaseapp.com",
  projectId: "photojournaljp",
  storageBucket: "photojournaljp.appspot.com",
  messagingSenderId: "345236676657",
  appId: "1:345236676657:web:ff79906253b90dc6673510",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { db, auth };
