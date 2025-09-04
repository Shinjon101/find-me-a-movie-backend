import { Router } from "express";

import { getMovie, getMovies } from "../controllers/moviesController";
import { validateGetMovie } from "../middlewares/validateMovieQueries";

const router = Router();

router.get("/", getMovies);

router.get("/:id", validateGetMovie, getMovie);

export default router;
