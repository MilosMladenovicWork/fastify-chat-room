export interface ServerToClientEvents {
  message: ({
    username,
    message,
  }: {
    username: string;
    message: string;
  }) => void;
}

export interface ClientToServerEvents {
  message: ({
    username,
    message,
  }: {
    username: string;
    message: string;
  }) => void;
  join_room: ({ roomName }: { roomName: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
