import fastify from "fastify";
import "dotenv/config";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { authorizeUser } from "src/users/users.controller";
export const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.register(cors, {
  origin: "*",
});

server.addHook("preParsing", async (request, reply, payload) => {
  try {
    const jwt = request.headers.authorization?.split(" ")[1];
    const user = await authorizeUser({ jwt });
    request.authUser = { email: user.email, id: Number(user.id) };
  } catch (error) {
    if (error instanceof Error) {
      return reply.code(401).send({ err: error.message });
    }
    return reply.code(401).send({ err: "User are not authorized" });
  }
  return payload;
});
server.register(fastifyCookie);
server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
