import { Request, Response, NextFunction } from "express";
import { logEvents } from "./logEvents";

type AppError = Error & { statusCode?: number };

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV !== "test") {
    logEvents(`${err.name}: ${err.message}`, "errLog.txt");
    if (process.env.NODE_ENV !== "production") {
      console.error(err.stack);
    }
  }

  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({ message });
};

export default errorHandler;
