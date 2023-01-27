import { authRepository } from "../repository/auth-repository";
import { newUser } from "../protocols";

export async function createNewUser(user: newUser) {
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
  return authRepository.create(user);
}

export const authService = {
  createNewUser,
};
