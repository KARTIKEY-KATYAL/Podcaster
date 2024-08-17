import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectioninstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `MONGODB CONNECTION SUCCESSFUL || DB_HOST : ${connectioninstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED`);
    process.exit(1);
  }
};

export default connectDB;
