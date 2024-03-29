import { Server, Socket } from "socket.io";

export interface ServerToClientEvents {
  message: ({
    username,
    message,
  }: {
    username: string;
    message: string;
  }) => void;
  typing_message: ({ username }: { username: string }) => void;
}

export interface ClientToServerEvents {
  message: ({
    username,
    message,
    roomName,
  }: {
    username: string;
    message: string;
    roomName: string;
  }) => void;
  join_room: ({ roomName }: { roomName: string }) => void;
  typing_message: ({
    username,
    roomName,
  }: {
    username: string;
    roomName: string;
  }) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export type SocketIoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketIoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
