// src/middleware/logger.ts
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import type { Request, Response, NextFunction } from "express";

export const logEvents = async (message: string, logName: string) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }
    await fsPromises.appendFile(path.join(logsDir, logName), logItem);
  } catch (err) {
    console.error("Logging error:", err);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(
    `${req.method}\t${req.headers.origin || "unknown"}\t${req.url}`,
    "reqLog.txt"
  );
  console.log(`${req.method} ${req.path}`);
  next();
};
