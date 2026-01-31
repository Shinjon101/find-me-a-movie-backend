import mongoose from "mongoose";

// After all tests, disconnect Mongoose if used
afterAll(async () => {
  try {
    if (mongoose && mongoose.connection && mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
  } catch (err) {
    // ignore errors during teardown
  }

  // Close HTTP server if exported from src/server.ts
  try {
    const { stopServer } = await import("../server.js");
    if (stopServer) await stopServer();
  } catch (err) {
    // ignore if not found
  }

  // Allow Jest to show remaining handles if any (optional)
  // await new Promise((r) => setTimeout(r, 100));
});
