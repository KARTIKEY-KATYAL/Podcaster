import mongoose from "mongoose";

const categoryschema = new mongoose.Schema(
  {
    categoryname: {
      type: String,
      unique: true,
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

export const category = mongoose.model("category", categoryschema);
