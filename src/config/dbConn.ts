import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing!");
  }

  return mongoose.connect(MONGO_URI, {
    dbName: "MoviesDatabase",
  });
}
