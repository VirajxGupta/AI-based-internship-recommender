// server/models/userModel.js
import { db } from "../firebaseAdmin.js";

/**
 * Add a new user to Firestore
 * @param {Object} user - { name, email, password }
 * @returns {Promise<Object>} - created user with ID
 */
export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Please provide name, email, and password");
  }

  // Email regex validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please add a valid email");
  }

  // Add user to Firestore
  const docRef = db.collection("users").doc(); // Auto-generate ID
  const userData = {
    name,
    email,
    password, // Ideally, hash this if storing directly (or use Firebase Auth)
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await docRef.set(userData);

  return { id: docRef.id, ...userData };
};

/**
 * Get all users from Firestore
 * @returns {Promise<Array>} - Array of users
 */
export const getUsers = async () => {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get a user by email
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
export const getUserByEmail = async (email) => {
  const snapshot = await db.collection("users").where("email", "==", email).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};
