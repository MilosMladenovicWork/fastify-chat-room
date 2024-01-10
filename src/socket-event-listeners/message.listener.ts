import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
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
  socket.on("message", ({ username, message }) =>
    messageListenerHandler({ socket }, { username, message })
  );
};

const messageListenerHandler = (
  {
    socket,
  }: {
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >;
  },
  { username, message }: { username: string; message: string }
) => {
  socket.emit("message", { username, message });
};
