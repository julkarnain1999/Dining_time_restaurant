// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQUt4P26DJLt3ltrLFH18H67Va-Wjw8k4",
  authDomain: "dine-time-app.firebaseapp.com",
  projectId: "dine-time-app",
  storageBucket: "dine-time-app.firebasestorage.app",
  messagingSenderId: "9422706631",
  appId: "1:9422706631:web:393eb9796c8582d95dabe2",
  measurementId: "G-5JTJ0HGD4H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
