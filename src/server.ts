import express, { urlencoded } from "express";
import { PORT } from "./config/env";
import helloRoutes from "./routes/helloRoutes";
import moviesRoutes from "./routes/moviesRoutes";
import genreRoutes from "./routes/genreRoutes";
import healthRoutes from "./routes/healthRoutes";
import { validateGetMovies } from "./middlewares/validateMovieQueries";
import { logger } from "./middlewares/logEvents";
import connectDB from "./config/dbConn";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import corsOptions from "./config/corsConfig";
import { apiKeyAuth } from "./middlewares/apiKeyAuth";
import { limiter } from "./middlewares/rateLimiter";
import helmet from "helmet";

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(helmet());

app.use(limiter);
app.use(logger);

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/", helloRoutes);
app.use("/", healthRoutes);

app.use(apiKeyAuth);
app.use("/api/movies", validateGetMovies, moviesRoutes);
app.use("/api/genres", genreRoutes);

app.all(/.*/, (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  (error as any).statusCode = 404;
  next(error);
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}`)
  );
});
