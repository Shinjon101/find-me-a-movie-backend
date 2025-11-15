import express, { urlencoded } from "express";
import { PORT } from "./config/env";
import helloRoutes from "./routes/helloRoutes";
import moviesRoutes from "./routes/moviesRoutes";
import genreRoutes from "./routes/genreRoutes";
import healthRoutes from "./routes/healthRoutes";
import { validateGetMovies } from "./middlewares/validateMovieQueries";
import { logger } from "./middlewares/logEvents";
import { connectDB } from "./config/dbConn";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import corsOptions from "./config/corsConfig";
import { apiKeyAuth } from "./middlewares/apiKeyAuth";
import { limiter } from "./middlewares/rateLimiter";
import helmet from "helmet";

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(helmet());

app.use(limiter);
app.use(logger);

app.use(express.json());
app.use(urlencoded({ extended: false }));

// Routes
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

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB");
    console.error(err);
    process.exit(1); // required for Render to show error logs
  });
