// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB09Juz6EBrRaLnXpZT3Un0Hzm5PhUdmk8",
  authDomain: "react-cursos-4e1a6.firebaseapp.com",
  projectId: "react-cursos-4e1a6",
  storageBucket: "react-cursos-4e1a6.appspot.com",
  messagingSenderId: "492063944070",
  appId: "1:492063944070:web:fa1a0d466104ce28bfd007"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);