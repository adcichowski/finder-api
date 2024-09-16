import { createBrowserClient } from "@supabase/ssr";
import { env } from "src/utils/env";

export function createClient() {
  return createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}

export const supabase = createClient();
