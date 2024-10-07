import "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    authUser: { email?: string; id: string };
  }
}
