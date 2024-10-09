import { server } from "index";
import { cataloguesWithCountedOffers } from "./catalogues.service";

server.get("/catalogues", async function (request, reply) {
  const selectedCatalogues = cataloguesWithCountedOffers({
    userId: request.authUser.id,
  });
  return reply.code(200).send({ catalogues: selectedCatalogues });
});
