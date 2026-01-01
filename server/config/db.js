import express from "express";
import { db } from "./firebase.js";

const app = express();
app.use(express.json());

// Add user
app.post("/api/addUser", async (req, res) => {
  const { name, email } = req.body;
  try {
    const docRef = await db.collection("users").add({ name, email });
    res.send(`User added with ID: ${docRef.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

