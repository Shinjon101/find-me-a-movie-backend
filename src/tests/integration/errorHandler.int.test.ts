import request from "supertest";
import app from "../../app";

describe("Global error handler", () => {
  it("returns 404 for unknown route", async () => {
    const res = await request(app).get("/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });
});
