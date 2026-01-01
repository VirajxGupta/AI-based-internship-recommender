// firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: "https://sih-2025-a50fa-default-rtdb.firebaseio.com", // 👈 must match your Firebase RTDB URL
});

// Firestore (if you need it)
const db = admin.firestore();

// Realtime Database
const rtdb = admin.database();

const auth = admin.auth();

// Export both
export { db, rtdb};
