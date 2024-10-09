import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { offers } from "./offers";
import { catalogues } from "./catalogues";

export const catalogueOffers = pgTable(
  "catalogueOffers",
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

export const cataloguesOffersRelations = relations(
  catalogueOffers,
  ({ one }) => ({
    offer: one(offers, {
      fields: [catalogueOffers.offerId],
      references: [offers.id],
    }),
    catalogue: one(catalogues, {
      fields: [catalogueOffers.catalogueId],
      references: [catalogues.id],
    }),
  })
);
