import app from "./app";
import { PORT } from "./config/env";
import { connectDB } from "./config/dbConn";

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB");
    console.error(err);
    process.exit(1);
  });
