import { createClient, supabase } from "src/lib/supabase";

export const getUserByJWT = async ({ jwt }: { jwt: string }) => {
  const res = await supabase.auth.getUser(jwt);
  if (!res) throw new Error("Problem with JWT token.");
};
