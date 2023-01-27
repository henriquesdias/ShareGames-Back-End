import express from "express";
import cors from "cors";

import loadEnv from "./config/envs";
import { postRouter } from "./routers/posts-routers";
import { authRouter } from "./routers/auth.routers";

loadEnv();

const server = express();
server.use(cors());
server.use(express.json());
server.use(postRouter);
server.use(authRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default server;
