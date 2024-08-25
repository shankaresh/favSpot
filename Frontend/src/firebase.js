// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAab4fSJNAO4ImmBvZMsF5Fd8EFCzQhXTE",
  authDomain: "myfavspotfrontend.firebaseapp.com",
  projectId: "myfavspotfrontend",
  storageBucket: "myfavspotfrontend.appspot.com",
  messagingSenderId: "35628483918",
  appId: "1:35628483918:web:1cbcdc4824a41df8f44a1f",
  measurementId: "G-2E2R9QJ8ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);