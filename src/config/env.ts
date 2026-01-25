import { config } from "dotenv";

config();

export const PORT = Number(process.env.PORT) || 8080;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI = process.env.MONGO_URI;
export const API_ACCESS_KEY = process.env.API_ACCESS_KEY;
export const CLIENT_URL = process.env.CLIENT_URL;

if (process.env.NODE_ENV !== "test") {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing!");
  }
  if (!API_ACCESS_KEY) {
    throw new Error("API_ACCESS_KEY is missing!");
  }
}
