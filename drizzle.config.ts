import { config } from "dotenv";
import { Config, defineConfig } from "drizzle-kit";
config({ path: ".env" });
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/finder-database",
  },
}) satisfies Config;
