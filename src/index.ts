import express from "express";
import loadEnv from "./config/envs.js";

loadEnv();

const server = express();

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
