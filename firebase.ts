import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHYViBmVFTpz8PJRAvS1ODJ8Su41t385c",
  authDomain: "todos-ffb59.firebaseapp.com",
  projectId: "todos-ffb59",
  storageBucket: "todos-ffb59.appspot.com",
  messagingSenderId: "158314538081",
  appId: "1:158314538081:web:7057f512d5930079d67620",
  measurementId: "G-V70R3XWV4G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }