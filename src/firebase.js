import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGF43QX18I2sIwEEduU4hA5o6_TkBlees",
  authDomain: "react--clone-b551e.firebaseapp.com",
  projectId: "react--clone-b551e",
  storageBucket: "react--clone-b551e.appspot.com",
  messagingSenderId: "407115567679",
  appId: "1:407115567679:web:a0020facb55da5a69bde8a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};


