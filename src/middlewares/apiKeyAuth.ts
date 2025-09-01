import { Request, Response, NextFunction } from "express";
import { API_ACCESS_KEY } from "../config/env";

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const clientKey = req.header("x-api-key");

  if (!clientKey || clientKey !== API_ACCESS_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }
  next();
}
