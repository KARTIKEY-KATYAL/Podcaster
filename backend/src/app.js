import express from "express";
import dotenv from "dotenv";
import router from "./routes/user.js";
import connectDB from "./db/index.js"
import cookieParser from "cookie-parser";
import catroute from "./routes/categories.js";
import podroute from "./routes/podcast.js";

dotenv.config({
  path: "./.env", 
});
connectDB()
const app = express();
app.use(express.json());
app.use(cookieParser())

const userApi = router
const catApi = catroute

app.use("/api/v1",userApi);
app.use("/api/v1",catApi);
app.use("/api/v1",podroute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
