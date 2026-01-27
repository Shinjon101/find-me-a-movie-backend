/**
 * Purpose:
 * - Verify API key middleware behavior

 */

import request from "supertest";
import app from "../../app";

// Mock moviesRoutes so this test does NOT touch MongoDB

jest.mock("../../routes/moviesRoutes", () => {
  const express = require("express");
  const router = express.Router();

  // Fake /api/movies handler
  router.get("/", (_req: any, res: any) => {
    return res.status(200).json({ ok: true });
  });

  return router;
});

describe("API Auth Middleware", () => {
  it("rejects requests without API key", async () => {
    const res = await request(app).get("/api/movies");

    expect(res.status).toBe(401);
  });

  it("rejects requests with invalid API key", async () => {
    const res = await request(app)
      .get("/api/movies")
      .set("x-api-key", "invalid-key");

    expect(res.status).toBe(401);
  });

  it("allows requests with valid API key", async () => {
    const res = await request(app)
      .get("/api/movies")
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
