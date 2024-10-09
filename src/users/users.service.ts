import { db } from "src/db";
import { users } from "src/db/schemas/users";
import { supabase } from "src/lib/supabase";
import { schemaJWT } from "./users.schemas";

export const getUserByJWT = async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await supabase.auth.getUser(jwt);
    const userJwt = schemaJWT.parse(data.user);
    return userJwt;
  } catch (error) {
    throw new Error("Problem with decoded token");
  }
};

export const getUserByEmail = async ({
  emailFromJwt,
}: {
  emailFromJwt: string;
}) => {
  return await db.query.users.findFirst({
    where: ({ email }, { eq }) => eq(email, emailFromJwt),
  });
};

export const createUser = async ({
  firstName = "",
  lastName = "",
  email,
}: {
  email: string;
  firstName?: string;
  lastName?: string;
}) => {
  return await db
    .insert(users)
    .values({
      email,
      firstName,
      lastName,
    })
    .returning();
};
