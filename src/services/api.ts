import axios from 'axios';

const BASE_URL = 'https://chat-api-k4vi.onrender.com';

export const setUsernameAPI = async (username: string) => {
  const response = await axios.post(`${BASE_URL}/chat/username`, {
    username: username,
  });
  return response.data;
};

export const getRoomsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/chat/rooms`);
  return response.data;
};

export const createRoomAPI = async (roomName: string) => {
  const response = await axios.post(`${BASE_URL}/chat/rooms`, {name: roomName});
  return response.data;
};

export const getMessagesAPI = async (roomId: string) => {
  console.log('getMessagesAPI: ', `${BASE_URL}/chat/rooms/${roomId}/messages`);
  const response = await axios.get(`${BASE_URL}/chat/rooms/${roomId}/messages`);
  console.log(
    '🚀 ~ getMessagesAPI ~ response:',
    JSON.stringify(response.data, null, 2),
  );
  return response.data;
};
