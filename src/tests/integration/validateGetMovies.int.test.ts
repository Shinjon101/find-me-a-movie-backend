import request from "supertest";
import app from "../../app";

describe("validateGetMovies middleware", () => {
  it("rejects invalid page number", async () => {
    const res = await request(app)
      .get("/api/movies")
      .query({ page: -1 })
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    expect(res.status).toBe(400);
  });

  it("rejects invalid sort option", async () => {
    const res = await request(app)
      .get("/api/movies")
      .query({ sort_by: "invalid" })
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    expect(res.status).toBe(400);
  });

  it("allows valid query params", async () => {
    const res = await request(app)
      .get("/api/movies")
      .query({ page: 1, limit: 10, sort_by: "popularity" })
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    expect(res.status).toBe(200);
  });
});
