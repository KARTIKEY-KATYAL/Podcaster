import express from "express";
import dotenv from "dotenv";
import router from "./routes/user.js";
import connectDB from "./db/index.js"
dotenv.config({
  path: "./.env", 
});
connectDB()
const app = express();
app.use(express.json());

const userApi = router

app.use("/api/v1",userApi);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
