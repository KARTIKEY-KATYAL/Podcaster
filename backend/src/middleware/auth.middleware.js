import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.podcasterToken;
  try {
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ error: "Invalid Token" });
  }
};

export default authMiddleware;
