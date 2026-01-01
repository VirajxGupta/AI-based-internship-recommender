import express from "express";
import cors from "cors";
import { db, rtdb } from "./firebaseAdmin.js";
import { register, login, logout } from "./controllers/usercontroller.js";
import authRoutes from "./routes/userroutes.js";
import { protect } from "./middleware/authmiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/user", protect, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Node.js backend! 🚀");
});

app.use("/api/auth", authRoutes);

app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/logout", logout);

// Example API for static user profile
app.get("/api/user", (req, res) => {
  res.json({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about AI",
    photo: null,
  });
});

// Firebase Firestore Routes
app.post("/api/addUser", async (req, res) => {
  const { name, email } = req.body;
  try {
    const docRef = await db.collection("users").add({ name, email });
    res.send(`User added with ID: ${docRef.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add internship (for testing)
app.post("/api/addInternship", async (req, res) => {
  const { title, company, skills, location } = req.body;
  try {
    const newInternshipRef = rtdb.ref("internships").push();
    await newInternshipRef.set({ title, company, skills, location });
    res.send(`Internship added with ID: ${newInternshipRef.key}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
