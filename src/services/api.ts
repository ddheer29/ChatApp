import axios from 'axios';

const BASE_URL = 'https://chat-api-k4vi.onrender.com';

export const setUsernameAPI = async (username: string) => {
  const response = await axios.post(`${BASE_URL}/chat/username`, {
    username: username,
  });
  return response.data;
};

export const getRoomsAPI = async () => {
  console.log('here we are calling all the rooms: ', `${BASE_URL}/chat/rooms`);
  const response = await axios.get(`${BASE_URL}/chat/rooms`);
  console.log('🚀 ~ getRoomsAPI ~ response:', response.data);
  return response.data;
};

export const createRoomAPI = async (roomName: string) => {
  const response = await axios.post(`${BASE_URL}/chat/rooms`, {name: roomName});
  return response.data;
};

export const getMessagesAPI = async (roomId: string) => {
  const response = await axios.get(`${BASE_URL}/chat/rooms/${roomId}/messages`);
  return response.data;
};
