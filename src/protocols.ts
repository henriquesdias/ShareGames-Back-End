export type newUser = {
  email: string;
  password: string;
  username: string;
  picture?: string;
};

export type loginInfo = Omit<newUser, "username" | "picture">;
