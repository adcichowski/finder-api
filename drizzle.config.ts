import { Config, defineConfig } from "drizzle-kit";
import { env } from "src/utils/env";

export default defineConfig({
  schema: "./src/db/schemas/*",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://postgres.mqfoaiwtuufzyghaaodh:${env.DATABASE_PASS}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
  },
}) satisfies Config;
