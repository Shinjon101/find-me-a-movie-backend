import express from "express";
import { PORT } from "./config/env";
import helloRoutes from "./routes/helloRoutes";
import { logger } from "./middlewares/logEvents";
const app = express();

app.use(logger);
app.use("/", helloRoutes);

app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}`)
);
