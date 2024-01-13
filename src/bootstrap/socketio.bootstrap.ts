import { logger } from "../logging/logger";
import { joinRoomListener } from "../socket-event-listeners/join-room.listener";
import { messageListener } from "../socket-event-listeners/message.listener";
import { typingMessageListener } from "../socket-event-listeners/typing-message.listener";
import { SocketIoServer } from "../types/socketio.types";

export const socketIoBootstrap = ({
  socketIoServer,
}: {
  socketIoServer: SocketIoServer;
}) => {
  try {
    socketIoServer.sockets.on("connection", (socket) => {
      logger.log("info", "connection event handler called", {
        socketId: socket.id,
      });

      messageListener({ socket, socketIo: socketIoServer });
      joinRoomListener({ socket });
      typingMessageListener({ socket, socketIo: socketIoServer });
    });
  } catch (e) {
    logger.error("sockets error", { e });
    throw e;
  }
};
