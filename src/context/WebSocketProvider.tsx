import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';

const WS_URL = 'ws://chat-api-k4vi.onrender.com/ws'; // Base URL

interface WebSocketContextType {
  ws: WebSocket | null;
  connectWebSocket: (roomId: string, username: string) => void;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWebSocket = (roomId: string, username: string) => {
    if (ws) {
      ws.close();
    }

    const newWs = new WebSocket(`${WS_URL}/${roomId}/${username}`);

    newWs.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    newWs.onmessage = (event) => {
      console.log('Message received:', event.data);
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    newWs.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    setWs(newWs);
  };

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, connectWebSocket, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
