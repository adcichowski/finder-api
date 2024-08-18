import { pgTable, timestamp, varchar, serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 120 }),
  lastName: varchar("lastName", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  refreshToken: varchar("refreshToken"),
});

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
});
