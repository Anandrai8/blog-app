import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("📩 Incoming signup request:", req.body);

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ User registered:", newUser.email);
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error("❌ Register Error:", err); // 👈 full error here
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
