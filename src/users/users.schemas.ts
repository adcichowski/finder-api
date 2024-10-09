import { email } from "envalid";
import { z } from "zod";

export const schemaJWT = z.object({
  email: z.string(),
});
