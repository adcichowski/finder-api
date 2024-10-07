import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { env } from "src/utils/env";

const client = new pg.Client({
  connectionString: `postgresql://postgres.mqfoaiwtuufzyghaaodh:${env.DATABASE_PASS}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
});
await client.connect();
export const db = drizzle(client);
