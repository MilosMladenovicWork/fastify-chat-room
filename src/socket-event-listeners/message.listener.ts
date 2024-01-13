import { Server } from "socket.io";
import { logger } from "../logging/logger";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketIoServer,
  SocketIoSocket,
} from "../types/socketio.types";

export const messageListener = ({
  socket,
  socketIo,
}: {
  socket: SocketIoSocket;
  socketIo: SocketIoServer;
}) => {
  socket.on("message", ({ username, message, roomName }) =>
    messageListenerHandler({ socketIo }, { username, message, roomName })
  );
};

const messageListenerHandler = (
  {
    socketIo,
  }: {
    socketIo: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >;
  },
  {
    username,
    message,
    roomName,
  }: { username: string; message: string; roomName: string }
) => {
  logger.log("info", "message event handler called", {
    username,
    message,
    roomName,
  });

  socketIo.to(roomName).emit("message", { username, message });
};
