import { Router } from "express";

import { getMovie, getMovies } from "../controllers/moviesController";

const router = Router();

router.get("/", getMovies);

router.get("/:id", getMovie);

export default router;
