import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 
import { getFirestore } from "firebase/firestore"; 

// ⚠️ Ye values apne Firebase Console se copy karo
const firebaseConfig = {
  apiKey: "AIzaSyBfSJifEkMypFZOEo2O8Z45XKWXXe08Q-A",
  authDomain: "sih-2025-a50fa.firebaseapp.com",
  databaseURL: "https://sih-2025-a50fa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sih-2025-a50fa",
  storageBucket: "sih-2025-a50fa.appspot.com",
  messagingSenderId: "331317061258",
  appId: "1:331317061258:web:da5c9741ddd6902a566f73",
  measurementId: "G-KFMKQCWQ91"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
