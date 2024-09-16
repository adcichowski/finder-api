import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const client = new pg.Client({
  connectionString:
    "postgres://postgres:postgres@localhost:5432/finder-database",
});
await client.connect();
export const db = drizzle(client);
