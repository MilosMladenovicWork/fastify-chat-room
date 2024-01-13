import { logger } from "../logging/logger";
import { rooms } from "../state/rooms";
import { SocketIoSocket } from "../types/socketio.types";

export const joinRoomListener = ({ socket }: { socket: SocketIoSocket }) => {
  socket.on("join_room", ({ roomName }) =>
    joinRoomListenerHandler({ socket }, { roomName })
  );
};

const joinRoomListenerHandler = (
  {
    socket,
  }: {
    socket: SocketIoSocket;
  },
  { roomName }: { roomName: string }
) => {
  logger.log("info", "join_room event handler called", { roomName, rooms });

  if (!rooms.includes(roomName)) {
    rooms.push(roomName);
  }

  for (const room of rooms) {
    socket.leave(room);
  }

  socket.join(roomName);
};
