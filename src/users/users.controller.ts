import { createUser, getUserByEmail, getUserByJWT } from "./users.service";

export const authorizeUser = async ({ jwt }: { jwt: string | undefined }) => {
  if (!jwt) throw new Error("Token is not provided.");
  const { email } = await getUserByJWT({ jwt });
  const user = await getUserByEmail({ emailFromJwt: email });
  if (!user) {
    const [createdUser] = await createUser({ email });
    return { id: createdUser.id, email: createdUser.email };
  }
  return { id: user.id, email: user.email };
};
