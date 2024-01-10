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
  socket.on("message", ({ username, message }) =>
    messageListenerHandler({ socketIo }, { username, message })
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
  { username, message }: { username: string; message: string }
) => {
  socketIo.sockets.emit("message", { username, message });
};
