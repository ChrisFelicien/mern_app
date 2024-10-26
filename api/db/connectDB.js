import mongoose from "mongoose";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const connectDB = asyncErrorHandler(async () => {
  const url = process.env.MONGO_URI.replace(
    /PASSWORD/,
    process.env.MONGO_PASSWORD
  );

  await mongoose.connect(url);

  console.log(`Connected to DB`);
});

export default connectDB;
