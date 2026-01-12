import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("MongoDB Connected...");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export { connectDB, mongoose };
