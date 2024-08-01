import fastify from "fastify";
import { db } from "src/db";

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

server.get("/ping", async (req, reply) => {
  const allUsers = "xd";
  console.log(process.env.DATABASE_URL);
  console.log(allUsers, "HOOOOO");
  reply.send({ hi: "hix" });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
