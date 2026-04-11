import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";   // ✅ ADD THIS
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9vHOUohSwhuwI4eo2dKh3jKiAHmZIWGU",
  authDomain: "arogyabhandhu.firebaseapp.com",
  projectId: "arogyabhandhu",
  storageBucket: "arogyabhandhu.firebasestorage.app",
  messagingSenderId: "447401132549",
  appId: "1:447401132549:web:3c396df7cd1ccccf43526c",
  measurementId: "G-DLS2H0E7PK"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
 