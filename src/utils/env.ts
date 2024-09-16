import { cleanEnv, str } from "envalid";
import "dotenv/config";
export const env = cleanEnv(process.env, {
  SUPABASE_URL: str(),
  SUPABASE_ANON_KEY: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});
