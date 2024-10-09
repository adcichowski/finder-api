import { count, eq } from "drizzle-orm";

import { db } from "src/db";
import { catalogues, catalogueOffers, offers } from "src/db/schemas";

export const cataloguesWithCountedOffers = async ({
  userId,
}: {
  userId: number;
}) => {
  return await db
    .select({
      id: catalogues.id,
      name: catalogues.name,
      createdAt: catalogues.createdAt,
      offerCount: count(catalogueOffers.offerId),
    })
    .from(catalogues)
    .innerJoin(catalogueOffers, eq(catalogues.id, catalogueOffers.catalogueId))
    .innerJoin(offers, eq(catalogueOffers.offerId, offers.id))
    .groupBy(catalogues.id)
    .where(eq(catalogues.userId, userId));
};
