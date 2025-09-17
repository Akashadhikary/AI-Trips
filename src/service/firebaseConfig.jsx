// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbxmyRKkGQy2otMBq0xTrVjIiwoClNq80",
  authDomain: "ai-trip-planner-d0720.firebaseapp.com",
  projectId: "ai-trip-planner-d0720",
  storageBucket: "ai-trip-planner-d0720.firebasestorage.app",
  messagingSenderId: "969377560739",
  appId: "1:969377560739:web:a75a553fa263ee459a2716",
  measurementId: "G-DYYG1MWJQ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);