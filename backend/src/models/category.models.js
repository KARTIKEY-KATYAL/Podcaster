import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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

export const Category = mongoose.model("Category", categorySchema);
