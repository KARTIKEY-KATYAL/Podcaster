import { Router } from "express";
const catroute = Router();
import { Category } from "../models/category.models.js";

catroute.post("/add-category", async (req, res) => {
  try {
    const { categoryname } = req.body;

    if (!categoryname) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Correctly create the new Category object
    const cat = new Category({ categoryname });

    await cat.save();
    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: "Server error" });
  }
});

export default catroute;
