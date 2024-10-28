import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Enter a username or password");
  }

  // Check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json("Username already exists!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    username: username,
    password: hashedPassword,
  });
  await user.save();

  if (user) {
    res
      .status(201)
      .json({ username: user.username, token: generateToken(user.id) });
  } else {
    res.status(500).json("Something went wrong, try again!");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user doesn't exist
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json("User does not exist!");
  }

  if (user.username == username && bcrypt.compare(password, user.password)) {
    res.json({
      username: user.username,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json("Incorrect username or password!");
  }
});

router.get("/me", protect, (req, res) => {
  res.json("Get my info");
});

export default router;
