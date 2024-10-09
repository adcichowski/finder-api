import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { offers } from "./offers";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  name: varchar("name").notNull(),
  country: varchar("country"),
  street: varchar("street"),
  city: varchar("city"),
  joinUs: varchar("joinUs"),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  offers: many(offers),
}));
