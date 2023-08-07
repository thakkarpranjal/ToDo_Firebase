// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxzSD9Y_tX-WS2kRo1n712UjHQuxrJdiw",
  authDomain: "project1-e0786.firebaseapp.com",
  projectId: "project1-e0786",
  storageBucket: "project1-e0786.appspot.com",
  messagingSenderId: "503091284462",
  appId: "1:503091284462:web:f1851d40ecce9518fbe6ff",
  measurementId: "G-SDJZLVBWKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app