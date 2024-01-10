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
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
