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
import { logger } from "./logging/logger";
import { joinRoomListener } from "./socket-event-listeners/join-room.listener";
import { messageListener } from "./socket-event-listeners/message.listener";
import { typingMessageListener } from "./socket-event-listeners/typing-message.listener";

const app = fastify();

app.register(fastifySocketIoPlugin);
app.register(fastifyStatic, fastifyStaticConfig);

app.listen({ port: 3000 });

app.ready((err) => {
  if (err) {
    logger.error("app ready error", { err });
    throw err;
  }
  try {
    app.io.sockets.on("connection", (socket) => {
      logger.log("info", "connection event handler called", {
        socketId: socket.id,
      });

      messageListener({ socket, socketIo: app.io });
      joinRoomListener({ socket });
      typingMessageListener({ socket, socketIo: app.io });
    });
  } catch (e) {
    logger.error("sockets error", { e });
    throw e;
  }
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
