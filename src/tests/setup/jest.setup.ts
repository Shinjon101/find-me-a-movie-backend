import { config } from "dotenv";
import { clearTestDB, closeTestDB, connectTestDB } from "./mongoMemory";

config({ path: ".env.test.local" });

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});
