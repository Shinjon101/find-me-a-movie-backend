import { Router } from "express";
import { readyCheck, healthCheck } from "../controllers/healthController";

const router = Router();

router.get("/health", healthCheck);
router.get("/ready", readyCheck);

export default router;
