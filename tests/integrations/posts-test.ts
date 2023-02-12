import supertest from "supertest";

import server from "../../src";
import { STATUS_CODE } from "../../src/helpers/status-code";
import { cleanDatabase, generateValidToken } from "../helpers";
import { createPost } from "../factories/posts-factories";
import { createUser } from "../factories/users-factories";
import { createComment } from "../factories/comments-factories";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database-postgres";

beforeEach(async () => {
  await cleanDatabase();
});

const api = supertest(server);

describe("GET /", () => {
  it("should respond with status 200 and posts data", async () => {
    const user = await createUser();

    const post = await createPost(user.id);

    const response = await api.get("/");

    expect(response.status).toBe(STATUS_CODE.OK);
    expect(response.body).toEqual([
      {
        id: post.id,
        userId: user.id,
        description: post.description,
        image: post.image,
        createdAt: post.createdAt.toISOString(),
        deletedAt: null,
        Users: {
          id: user.id,
          username: user.username,
          picture: user.picture,
          createdAt: user.createdAt.toISOString(),
          deletedAt: null,
        },
      },
    ]);
  });
});

describe("POST /create-post", () => {
  it("should respond with status 401 if no token is given", async () => {
    await createUser();
    const response = await api
      .post("/create-post")
      .send({ description: faker.random.words() });

    expect(response.status).toBe(STATUS_CODE.UNAUTHORIZED);
  });

  it("should respond with status 401 if token is not valid", async () => {
    await createUser();
    const token = faker.random.alphaNumeric();
    const response = await api
      .post("/create-post")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(STATUS_CODE.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 201 ,post data and add a new post on database", async () => {
      const user = await createUser();
      const token = generateValidToken(user);
      const description = faker.random.words();
      const response = await api
        .post("/create-post")
        .set("Authorization", `Bearer ${token}`)
        .send({ description });

      const post = await prisma.posts.findFirst();
      expect(response.status).toBe(STATUS_CODE.CREATED);
      expect(response.body).toMatchObject({
        userId: user.id,
        description,
      });
      expect(response.body).toMatchObject({
        userId: post.userId,
        description: post.description,
      });
    });
  });
});
