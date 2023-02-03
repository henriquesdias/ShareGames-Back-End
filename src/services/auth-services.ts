import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repository/auth-repository";
import { newUser } from "../protocols";

async function createNewUser(user: newUser) {
  const userByEmail = await authRepository.findUserByEmail(user.email);
  if (userByEmail) {
    throw { name: "errorWithEmail", message: "this email already in use" };
  }
  const userByUsername = await authRepository.getUserByUsername(user.username);
  if (userByUsername) {
    throw {
      name: "errorwithUsername",
      message: "this username already in use",
    };
  }
  return authRepository.create({
    email: user.email,
    username: user.username,
    password: bcrypt.hashSync(user.password, 10),
    picture: user.picture,
  });
}

async function signIn(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw {
      name: "unauthorized",
      message: "the credentials are wrong",
    };
  }
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET
  );
}
const authService = {
  createNewUser,
  signIn,
};

export default authService;
