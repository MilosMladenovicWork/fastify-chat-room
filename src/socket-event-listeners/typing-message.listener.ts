import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketIoServer,
  SocketIoSocket,
} from "../types/socketio.types";

export const typingMessageListener = ({
  socket,
  socketIo,
}: {
  socket: SocketIoSocket;
  socketIo: SocketIoServer;
}) => {
  socket.on("typing_message", ({ username, roomName }) =>
    typingMessageListenerHandler({ socketIo }, { username, roomName })
  );
};

const typingMessageListenerHandler = (
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
  { username, roomName }: { username: string; roomName: string }
) => {
  socketIo.to(roomName).emit("typing_message", { username });
};
