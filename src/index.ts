import express from "express";
import cors from "cors";

import loadEnv from "./config/envs";
import { postRouter } from "./routers/posts-routers";
import { authRouter } from "./routers/auth-routers";
import { commentRouter } from "./routers/comments-routers";

loadEnv();

const server = express();
server.use(cors());
server.use(express.json());
server.use(postRouter);
server.use(authRouter);
server.use(commentRouter);

export default server;
