import express, { urlencoded } from "express";
import { PORT } from "./config/env";
import helloRoutes from "./routes/helloRoutes";
import moviesRoutes from "./routes/moviesRoutes";
import { logger } from "./middlewares/logEvents";
import connectDB from "./config/dbConn";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
const app = express();

connectDB();
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(logger);
app.use("/", helloRoutes);
app.use("/movies", moviesRoutes);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}`)
  );
});
