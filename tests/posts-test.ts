import supertest from "supertest";

import server from "../src";
import { STATUS_CODE } from "../src/helpers/status-code";
import { cleanDatabase } from "./helpers";
import { createPost } from "./factories/posts-factories";
import { createUser } from "./factories/users-factories";
import { createComment } from "./factories/comments-factories";

beforeEach(async () => {
  await cleanDatabase();
});

const api = supertest(server);

describe("GET /", () => {
  it("testando", async () => {
    const user = await createUser();
    const post = await createPost(user.id);
    const comment = await createComment(user.id, post.id);

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
        Comments: [
          {
            id: comment.id,
            description: comment.description,
            createdAt: comment.createdAt.toISOString(),
            deletedAt: null,
            Users: {
              id: user.id,
              username: user.username,
              picture: user.picture,
            },
          },
        ],
      },
    ]);
  });
});
