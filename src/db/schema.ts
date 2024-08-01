import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  auth0Id: varchar("auth0Id", { length: 120 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 120 }),
  lastName: varchar("lastName", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
