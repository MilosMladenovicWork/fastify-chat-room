import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types/socketio.types";

export const messageListener = ({
  socket,
}: {
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
}) => {
  socket.on("message", ({ username, message }) => {
    socket.emit("message", { username, message });
  });
};
