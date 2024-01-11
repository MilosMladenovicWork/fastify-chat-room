import { Server, Socket } from "socket.io";
import { rooms } from "../state/rooms";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socketio.types";

export const joinRoomListener = ({
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
  socket.on("join_room", ({ roomName }) =>
    joinRoomListenerHandler({ socket, socketIo }, { roomName })
  );
};

const joinRoomListenerHandler = (
  {
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
  },
  { roomName }: { roomName: string }
) => {
  if (!rooms.includes(roomName)) {
    rooms.push(roomName);
  }

  for (const room of rooms) {
    socket.leave(room);
  }

  socket.join(roomName);
};
