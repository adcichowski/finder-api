import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgres://postgres:postgres@localhost:5432/finder-database",
});
await client.connect();
export const db = drizzle(client);
