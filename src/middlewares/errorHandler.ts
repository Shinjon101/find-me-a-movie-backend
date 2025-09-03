import { logEvents } from "./logEvents";

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");

  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({ message });
};

export default errorHandler;
