import { Router } from "express";
import { user } from "../models/user.models.js";
import bcrypt from "bcrypt";

const router = Router();
const User = user;

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length > 8) {
      return res
        .status(400)
        .json({ message: "Username should be a maximum of 8 characters" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long" });
    }

    // Check if the user or email is already registered
    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (existingUsername || existingEmail) {
      return res
        .status(400)
        .json({ message: "Username or Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashPass });
    await newUser.save();

    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
