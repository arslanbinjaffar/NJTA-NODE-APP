import request from "supertest";
import app from "../app";

describe("App test case", () => {
  test("Home route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual("Welcome to express home page");
  });
});
