import request from "supertest";
import app from "../../app";

describe("GET /health", () => {
  it("return 200 and status OK", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
      }),
    );

    expect(typeof res.body.timestamp).toBe("string");
    expect(typeof res.body.uptime).toBe("number");
    expect(typeof res.body.mongoConnected).toBe("boolean");
  });
});
