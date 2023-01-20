import express from "express";
import loadEnv from "./config/envs.js";
import { prisma } from "./config/database-postgres.js";

loadEnv();

const server = express();

server.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});
const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
