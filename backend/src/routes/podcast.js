import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";
import { Category } from "../models/category.models.js";
import { User } from "../models/user.models.js";
import { podcast } from "../models/podcast.models.js";

const podroute = Router();

// Add Podcast
podroute.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontimage"][0].path;
    const audioFile = req.files["audiofile"][0].path;

    if (!title || !category || !description || !frontImage || !audioFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { user } = req;
    const cat = await Category.findOne({ categoryname: category });
    if (!cat) {
      return res.status(400).json({ message: "No Category Found" });
    }

    const catId = cat._id;
    const userId = user._id;

    const newPodcast = new Podcast({
      title,
      description,
      category: catId,
      frontimage: frontImage,
      audiofile: audioFile,
      user: userId,
    });

    await newPodcast.save();

    await Category.findByIdAndUpdate(
      catId,
      { $push: { podcast: newPodcast._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $push: { podcast: newPodcast._id } },
      { new: true }
    );

    res.status(201).json({ message: "Podcast created successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Failed to Add Podcast" });
  }
});

// GET All Podcasts
podroute.get("/all-podcast", async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET User Podcasts
podroute.get("/all-user-podcast", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;

    const data = await User.findById(userId)
      .populate({
        path: "podcasts",
        populate: {
          path: "category",
        },
      })
      .select("-password");

    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Podcast by ID
podroute.get("/all-podcast/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findById(id).populate("category");

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    return res.status(200).json({ data: podcast });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Podcasts by Category
podroute.get("/category/:cat", authMiddleware, async (req, res) => {
  try {
    const { cat } = req.params;
    const category = await Category.findOne({ categoryname: cat }).populate(
      "podcast"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const podcasts = category.podcast;

    return res.status(200).json({ data: podcasts });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default podroute;
