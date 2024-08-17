import { Router } from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();
const user = User;

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

    const newUser = new user({ username, email, password: hashPass });
    await newUser.save();

    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/sign-in",async (req,res)=>{
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user or email is already registered
    const [existingUser] = await Promise.all([
      User.findOne({ email }),
    ]);

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials" });
    }

    // Check if password is matched or not

    const isMatched=bcrypt.compare(password,existingUser.password)
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }


    // Generate JWT Token
    const token = jwt.sign({id : existingUser._id , email : existingUser.email},process.env.JWT_SECRET,{expiresIn : "30d"})

    res.cookie("podcasterToken",token,{
      httpOnly : true,
      maxAge : 30*60*60*1000, // 30 days
      secure :process.env.NODE_ENV,
      sameSite : "none"
    });

    return res.status(200).json({
      id : existingUser._id,
      username : existingUser.username,
      email : existingUser.email,
      message : "Signed In Successfully"
    })

  } catch (error) {
     console.error(`Error: ${error}`);
     return res.status(500).json({ error: "Server error" });
  }
});

// Logout
router.post("/logout", async (req,res) =>{
  res.clearCookie("podcasterToken",{
    httpOnly : true
  });
  res.status(200).json({message : "Logged Out"})
})

// check if cookie is there or not
router.get("/check-cookie", async (req, res) => {
 const token = req.cookies.podcasterToken;
 if (token){
    res.status(200).json({ message: "True" });
 }
 res.status(200).json({ message: "False" });
});

// Route to Fetch User Details
router.get("/user-details",authMiddleware, async (req, res) => {
  try {
    const {email} =req.user
    const existinguser = await User.findOne({email : email}).select("-password")
    res.status(200).json({
      user : existinguser
    })
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
