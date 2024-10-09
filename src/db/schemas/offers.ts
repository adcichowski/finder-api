import {
  boolean,
  integer,
  jsonb,
  serial,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { relations } from "drizzle-orm/relations";

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  availableTo: timestamp("availableTo"),
  remote: boolean("remote").default(false),
  requirements: jsonb("requirements"),
  maxPayment: integer("maxPayment"),
  minPayment: integer("minPayment").notNull(),
  companyId: integer("companyId").references(() => companies.id),
});

export const offersRelations = relations(offers, ({ one }) => ({
  companyId: one(companies, {
    fields: [offers.companyId],
    references: [companies.id],
  }),
}));
