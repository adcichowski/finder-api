import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  integer,
  boolean,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 120 }).notNull(),
  lastName: varchar("lastName", { length: 120 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  refreshToken: varchar("refreshToken"),
});

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

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  name: varchar("name").notNull(),
  country: varchar("country"),
  street: varchar("street"),
  city: varchar("city"),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  offers: many(offers),
}));

export const catalogues = pgTable("catalogues", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const cataloguesForUser = pgTable(
  "cataloguesForUser",
  {
    catalogueId: integer("catalogueId")
      .notNull()
      .references(() => catalogues.id),
    offerId: integer("offerId")
      .notNull()
      .references(() => offers.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.catalogueId, t.offerId] }),
  })
);

export const cataloguesForUserRelations = relations(
  cataloguesForUser,
  ({ one }) => ({
    offer: one(offers, {
      fields: [cataloguesForUser.offerId],
      references: [offers.id],
    }),
    catalogue: one(catalogues, {
      fields: [cataloguesForUser.catalogueId],
      references: [catalogues.id],
    }),
  })
);

export const workApplications = pgTable("workApplications", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
  offerId: integer("offerId").references(() => offers.id),
});

export const userApplication = relations(workApplications, ({ one }) => ({
  offerId: one(offers, {
    fields: [workApplications.offerId],
    references: [offers.id],
  }),
  userId: one(users, {
    fields: [workApplications.userId],
    references: [users.id],
  }),
}));
