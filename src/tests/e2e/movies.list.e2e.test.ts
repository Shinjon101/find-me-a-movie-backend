import request from "supertest";
import app from "../../app";
import { seedMovies } from "../fixtures/movies";

describe("GET /api/movies", () => {
  beforeEach(async () => {
    await seedMovies();
  });

  it("returns paginated movie list with mapped genres", async () => {
    const res = await request(app)
      .get("/api/movies")
      .query({
        page: 1,
        limit: 10,
      })
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("page", 1);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);

    const movie = res.body.results[0];

    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("genres");
    expect(Array.isArray(movie.genres)).toBe(true);
  });
});
