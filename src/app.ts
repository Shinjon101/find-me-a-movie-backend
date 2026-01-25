// src/app.ts
import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";

import helloRoutes from "./routes/helloRoutes";
import moviesRoutes from "./routes/moviesRoutes";
import genreRoutes from "./routes/genreRoutes";
import healthRoutes from "./routes/healthRoutes";

import corsOptions from "./config/corsConfig";
import { validateGetMovies } from "./middlewares/validateMovieQueries";
import { logger } from "./middlewares/logEvents";
import { apiKeyAuth } from "./middlewares/apiKeyAuth";
import { limiter } from "./middlewares/rateLimiter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Global middleware
app.use(cors(corsOptions));
app.use(helmet());

if (process.env.NODE_ENV !== "test") {
  app.use(limiter);
  app.use(logger);
}

app.use(express.json());
app.use(urlencoded({ extended: false }));

// Public routes
app.use("/", helloRoutes);
app.use("/", healthRoutes);

// Protected routes
app.use(apiKeyAuth);
app.use("/api/movies", validateGetMovies, moviesRoutes);
app.use("/api/genres", genreRoutes);

// 404
app.all(/.*/, (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  (error as any).statusCode = 404;
  next(error);
});

// Error handler
app.use(errorHandler);

export default app;
