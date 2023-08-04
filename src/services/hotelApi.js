import api from './api';

export async function getHotels(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

export async function getRoomsByHotelId(token, hotelId) {
  const response = await api.get(`/room/:${hotelId}`);
  
  return response.data;
};
