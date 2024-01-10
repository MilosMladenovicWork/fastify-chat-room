import fastify from "fastify";
import { Server } from "socket.io";
import { fastifySocketIoPlugin } from "./plugins/fastify-socketio.plugin";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/socketio.types";

import fastifyStatic from "@fastify/static";
import { fastifyStaticConfig } from "./config/fastify-static.config";
import { messageListener } from "./socket-event-listeners/message.listener";

const app = fastify();

app.register(fastifySocketIoPlugin);
app.register(fastifyStatic, fastifyStaticConfig);

app.listen({ port: 3000 });

app.ready((err) => {
  if (err) throw err;
  app.io.sockets.on("connection", (socket) => {
    messageListener({ socket });
  });
});

declare module "fastify" {
  interface FastifyInstance {
    io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >;
  }
}
