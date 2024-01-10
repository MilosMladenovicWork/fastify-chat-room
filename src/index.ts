import fastify from "fastify";
import { Server } from "socket.io";
import { fastifySocketIoPlugin } from "./plugins/fastify-socketio.plugin";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/socketio.types";

const app = fastify();

app.register(fastifySocketIoPlugin);

app.get("/", (req: any, reply: any) => {
  app.io.emit("message", { username: "User", message: "Hey" });
});

app.listen({ port: 3000 });

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
