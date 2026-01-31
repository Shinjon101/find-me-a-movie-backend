import http from "http";
import app from "./app";
import { PORT } from "./config/env";
import { connectDB } from "./config/dbConn";

let server: http.Server | null = null;

export const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
  return server;
};

export const stopServer = async () => {
  if (server) {
    await new Promise((resolve) => server.close(() => resolve(null)));
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer().catch((err) => {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  });
}
