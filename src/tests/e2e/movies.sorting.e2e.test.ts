import request from "supertest";
import app from "../../app";
import { seedMovies } from "../fixtures/movies";

describe("GET /api/movies – sorting", () => {
  beforeEach(async () => {
    await seedMovies();
  });

  it("defaults to popularity sorting", async () => {
    const res = await request(app)
      .get("/api/movies")
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    const popularities = res.body.results.map((m: any) => m.popularity);
    const sorted = [...popularities].sort((a, b) => b - a);

    expect(popularities).toEqual(sorted);
  });

  it("sorts by vote_average", async () => {
    const res = await request(app)
      .get("/api/movies")
      .query({ sort_by: "vote_average" })
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    const votes = res.body.results.map((m: any) => m.vote_average);
    const sorted = [...votes].sort((a, b) => b - a);

    expect(votes).toEqual(sorted);
  });

  it("sorts by release_date", async () => {
    const res = await request(app)
      .get("/api/movies")
      .query({ sort_by: "release_date" })
      .set("x-api-key", process.env.API_ACCESS_KEY as string);

    const dates = res.body.results.map((m: any) =>
      new Date(m.release_date).getTime(),
    );
    const sorted = [...dates].sort((a, b) => b - a);

    expect(dates).toEqual(sorted);
  });
});
