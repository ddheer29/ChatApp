import {io} from 'socket.io-client';

const SOCKET_URL = 'ws://chat-api-k4vi.onrender.com/ws';

export const createSocket = (roomId: string, username: string) => {
  return io(`${SOCKET_URL}/${roomId}/${username}`);
};
