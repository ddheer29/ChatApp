interface RouteParams {
  roomId: string;
  roomName: string;
  username: string;
}

interface Message {
  id: string;
  content: string;
  username: string;
  created_at: string;
}

interface WebSocketMessageEvent {
  event: string;
  content: string;
  sender: string;
}
