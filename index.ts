import fastify from "fastify";
import "dotenv/config";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { getUserByJWT } from "src/users/users.service";

const server = fastify({
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
    const token = request.headers.authorization?.split(" ")[1];
    const { data } = await getUserByJWT({ jwt: token });
    if (data.user === null) {
      return reply
        .code(401)
        .send({ err: "Problem to recognize error during authorization." });
    }
    request.authUser = { email: data.user.email, id: data.user.id };
  } catch (error) {
    if (error instanceof Error) {
      reply.code(401).send({ err: error.message });
    }
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

server.get("/", async function (request, reply) {
  console.log(request.authUser);
  reply.code(200).send({ hello: request.authUser });
});
