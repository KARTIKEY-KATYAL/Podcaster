import mongoose from "mongoose";

const podcastschema = new mongoose.Schema(
  {
    frontimage: {
      type: String,
      unique: true,
      required: true,
    },
    audiofile: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    user: [
        {
      type: mongoose.Types.ObjectId,
      ref: "user",
        },
    ],
    category: [
        {
      type: mongoose.Types.ObjectId,
      ref: "category",
        },
    ],
  },
  { timestamps: true }
);

export const podcast = mongoose.model("podcast", podcastschema);
