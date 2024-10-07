import { supabase } from "src/lib/supabase";

export const getUserByJWT = async ({ jwt }: { jwt: string | undefined }) => {
  if (!jwt) throw new Error("Token is not provided.");
  const res = await supabase.auth.getUser(jwt);
  if (!res) throw new Error("Problem with JWT token.");
  return res;
};
