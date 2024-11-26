// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7FDkgZOJnWW0jE0q0QyxAxqW6uTQ8IGg",
  authDomain: "my-taskmanager-8ca55.firebaseapp.com",
  projectId: "my-taskmanager-8ca55",
  storageBucket: "my-taskmanager-8ca55.firebasestorage.app",
  messagingSenderId: "261241086913",
  appId: "1:261241086913:web:0cd280f798ca9a1ebd8540",
  measurementId: "G-N4ZM2KS2Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };