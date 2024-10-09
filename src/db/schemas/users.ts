import { pgTable, timestamp, varchar, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { offers } from "./offers";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 120 }).notNull(),
  lastName: varchar("lastName", { length: 120 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  refreshToken: varchar("refreshToken"),
});

export const usersRelations = relations(offers, ({ many }) => ({
  offers: many(offers),
}));
