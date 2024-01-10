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
import path from "path";

const app = fastify();

app.register(fastifySocketIoPlugin);
app.register(fastifyStatic, {
  root: path.join(__dirname, "static"),
  prefix: "/static/",
});

app.listen({ port: 3000 });

app.ready((err) => {
  if (err) throw err;
  app.io.sockets.on("connection", (socket) => {
    socket.on("message", ({ username, message }) => {
      socket.emit("message", { username, message });
    });
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
