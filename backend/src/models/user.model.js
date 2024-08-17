import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    user: {
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
      required: true
    },
    podcast:[
        {
        type : mongoose.Types.ObjectId,
        ref : "podcasts"
        },
    ],
  },
  { timestamps : true }
);

export const user = mongoose.model("user",userschema)