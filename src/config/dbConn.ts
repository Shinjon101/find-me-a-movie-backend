import mongoose from "mongoose";
import { MONGO_URI } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
