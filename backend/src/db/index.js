import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectioninstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
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
