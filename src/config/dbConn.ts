import mongoose from "mongoose";
import { MONGO_URI } from "./env";

const connectDB = async () => {
  if (!MONGO_URI) return Error("No mongo uri");
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "MoviesDatabase",
    });
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
