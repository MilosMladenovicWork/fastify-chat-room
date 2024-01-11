import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socketio.types";

export const messageListener = ({
  socket,
  socketIo,
}: {
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  socketIo: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
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
  socketIo.to(roomName).emit("message", { username, message });
};
