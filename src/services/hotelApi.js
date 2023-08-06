import api from './api';

export async function getHotels(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

export async function getRoomsByHotelId(hotelId) {
  const response = await api.get(`/room/${hotelId}`);
  
  return response.data;
};

export async function getBookingsByRoomId(token, roomId) {
  const response = await api.get(`/booking/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
  });
  
  return response.data;
};

export async function makeBooking(token, roomId) {
  const response = await api.post('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, { roomId });

  return response.data;
}
