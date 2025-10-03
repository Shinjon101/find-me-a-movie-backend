import { Request, Response } from "express";
import mongoose from "mongoose";

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1,
  });
};

export const readyCheck = (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (!isDbConnected) {
    return res.status(503).json({
      status: "unhealthy",
      message: "Database not connected",
    });
  }

  res.status(200).json({
    status: "ready",
    timestamp: new Date().toISOString(),
  });
};
