import { Router } from "express";

import { getPopMovie } from "../controllers/moviesController";

const router = Router();

router.get("/", getPopMovie);

export default router;
