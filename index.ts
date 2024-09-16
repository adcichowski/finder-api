import fastify from "fastify";
import "dotenv/config";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { env } from "src/utils/env";
import { createClient } from "src/lib/supabase";

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

server.register(fastifyCookie);
server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.get("/", async function (request, reply) {
  const token = request.headers.authorization?.split(" ")[1];

  const supabase = createClient();
  const res = await supabase.auth.getUser(token);
  console.log(res, token);
  reply.send({ user: res.data });
});
