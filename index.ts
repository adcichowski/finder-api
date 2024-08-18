import fastify from "fastify";
import "dotenv/config";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import oauthPlugin from "@fastify/oauth2";
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
server.register(fastifyCookie, {
  parseOptions: {
    secure: true,
    sameSite: "lax",
  },
});
server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.register(oauthPlugin, {
  name: "googleOAuth2",
  scope: ["profile", "email"],
  credentials: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_SECRET_KEY,
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: "/login/google",
  callbackUri: "http://localhost:8000/login/google/callback",
  cookie: {
    secure: true,
    sameSite: "lax",
  },
});

server.get("/login/google/callback", async function (request, reply) {
  const { token } =
    await server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

  console.log(token.access_token);

  reply.send({ access_token: token.access_token });
});
