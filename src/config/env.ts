import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, MONGO_URI, API_ACCESS_KEY, CLIENT_URL } =
  process.env;
