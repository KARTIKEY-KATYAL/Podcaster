import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      // Renamed from 'user' to 'username'
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    podcast: [
      {
        type: mongoose.Types.ObjectId,
        ref: "podcasts",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
