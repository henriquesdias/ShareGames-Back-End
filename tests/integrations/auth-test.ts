import supertest from "supertest";
import { faker } from "@faker-js/faker";

import server from "../../src";
import { prisma } from "../../src/config/database-postgres";
import { STATUS_CODE } from "../../src/helpers/status-code";
import { cleanDatabase } from "../helpers";
import { createUser } from "../factories/users-factories";
import { any, number, string } from "joi";

beforeEach(async () => {
  await cleanDatabase();
});

const api = supertest(server);

describe("Post /sign-up", () => {
  it("should respond with status 201 and create a new user on database", async () => {
    const newUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(8),
    };

    const response = await api.post("/sign-up").send(newUser);
    const allUsers = await prisma.users.findFirst();

    expect(response.status).toBe(STATUS_CODE.CREATED);
    expect(allUsers).toMatchObject({
      email: newUser.email,
      username: newUser.username,
    });
  });

  it("should respond with status 422 if any informations of user were wrong", async () => {
    const newUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(4),
    };

    const response = await api.post("/sign-up").send(newUser);

    expect(response.status).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 409 if email sent already in use", async () => {
    const user = await createUser();
    const newUser = {
      email: user.email,
      username: faker.internet.userName(),
      password: faker.internet.password(8),
    };

    const response = await api.post("/sign-up").send(newUser);

    expect(response.status).toBe(STATUS_CODE.CONFLICT);
  });

  it("should respond with status 409 if username sent already in use", async () => {
    const user = await createUser();
    const newUser = {
      email: faker.internet.email(),
      username: user.username,
      password: faker.internet.password(8),
    };

    const response = await api.post("/sign-up").send(newUser);

    expect(response.status).toBe(STATUS_CODE.CONFLICT);
  });
});

describe("POST /sign-in", () => {
  it("should respond with status 200 and returns a token", async () => {
    const password = faker.internet.password(8);
    const user = await createUser(password);

    const response = await api
      .post("/sign-in")
      .send({ email: user.email, password });
    expect(response.status).toBe(STATUS_CODE.OK);
    expect(response.body).toEqual({ token: expect.any(String) });
  });

  it("should respond with status 401 if email sent do not exists", async () => {
    const response = await api.post("/sign-in").send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(STATUS_CODE.UNAUTHORIZED);
  });

  it("should respond with status 401 if password is not valid", async () => {
    const user = await createUser();

    const response = await api.post("/sign-in").send({
      email: user.email,
      password: faker.internet.password(8),
    });

    expect(response.status).toBe(STATUS_CODE.UNAUTHORIZED);
  });
});
