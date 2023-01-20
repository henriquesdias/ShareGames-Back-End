import express from "express";
import loadEnv from "./config/envs.js";
import { postRouter } from "./routers/posts-routers.js";

loadEnv();

const server = express();
server.use(postRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
