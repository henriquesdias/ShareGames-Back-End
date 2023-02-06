import supertest from "supertest";
import { faker } from "@faker-js/faker";

import server from "../../src";
import { prisma } from "../../src/config/database-postgres";
import { STATUS_CODE } from "../../src/helpers/status-code";
import { cleanDatabase, generateValidToken } from "../helpers";
import { createUser } from "../factories/users-factories";
import { createPost } from "../factories/posts-factories";

beforeEach(async () => {
  await cleanDatabase();
});

const api = supertest(server);

describe("POST /comments:postId", () => {
  it("should respond with status 401 if no token is given", async () => {
    await createUser();
    const response = await api
      .post(`/comments/${faker.random.numeric()}`)
      .send({ description: faker.random.words() });

    expect(response.status).toBe(STATUS_CODE.UNAUTHORIZED);
  });

  it("should respond with status 401 if token is not valid", async () => {
    await createUser();
    const token = faker.random.alphaNumeric();
    const response = await api
      .post(`/comments/${faker.random.numeric()}`)
      .send({ description: faker.random.words() })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(STATUS_CODE.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 422 if body sent is wrong", async () => {
      const user = await createUser();
      const token = generateValidToken(user);
      const response = await api
        .post(`/comments/${faker.random.numeric()}`)
        .send({ description: "" })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
    });
  });

  it("should respond with status 404 if post with id sent do not exist", async () => {
    const user = await createUser();
    const token = generateValidToken(user);
    const response = await api
      .post(`/comments/${faker.random.numeric()}`)
      .send({ description: faker.random.words(10) })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(STATUS_CODE.NOT_FOUND);
  });

  it("should respond with status 422 if postId is invalid", async () => {
    const user = await createUser();
    const token = generateValidToken(user);
    const response = await api
      .post(`/comments/${faker.random.word()}`)
      .send({ description: faker.random.words(10) })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 and respond with comment data", async () => {
    const user = await createUser();
    const post = await createPost(user.id);
    const token = generateValidToken(user);
    const description = faker.random.words(10);
    const response = await api
      .post(`/comments/${post.id}`)
      .send({ description })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(STATUS_CODE.CREATED);
    expect(response.body).toMatchObject({
      userId: user.id,
      postId: post.id,
      description,
    });
  });

  it("should create a new comment on database", async () => {
    const user = await createUser();
    const post = await createPost(user.id);
    const token = generateValidToken(user);
    const description = faker.random.words(10);
    await api
      .post(`/comments/${post.id}`)
      .send({ description })
      .set("Authorization", `Bearer ${token}`);

    const comment = await prisma.comments.findFirst();
    expect(comment).toMatchObject({
      userId: user.id,
      postId: post.id,
      description,
    });
  });
});
