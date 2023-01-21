import supertest from "supertest";

import server from "../src";

const api = supertest(server);

describe("Testando get /", () => {
  it("testando", async () => {
    const result = await api.get("/");

    expect(result).toBe("oi");
  });
});
