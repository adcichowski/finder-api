import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { catalogueOffers } from "./catalogueOffers";

export const catalogues = pgTable("catalogues", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  name: varchar("name").notNull(),
  userId: integer("userId").notNull(),
});

export const cataloguesRelations = relations(catalogues, ({ many }) => ({
  users: many(users),
  offers: many(catalogueOffers),
}));
