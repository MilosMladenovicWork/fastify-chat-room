import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Server, ServerOptions } from "socket.io";
import { SocketIoServer } from "../types/socketio.types";

export const fastifySocketIoPlugin: FastifyPluginAsync<Partial<ServerOptions>> =
  fp(
    async function (fastify, opts) {
      fastify.decorate("io", new Server(fastify.server, opts));
      fastify.addHook("onClose", (fastify: FastifyInstance, done) => {
        (fastify as any).io.close();
        done();
      });
    },
    { fastify: ">=4.x.x", name: "fastify-socket.io" }
  );

declare module "fastify" {
  interface FastifyInstance {
    io: SocketIoServer;
  }
}
