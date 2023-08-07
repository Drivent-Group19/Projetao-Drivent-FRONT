import api from './api';

export async function getHotels(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

export async function getHotelById(token, hotelId) {
  const response = await api.get(`/hotels/${hotelId}`, {
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

export async function getRoomById(roomId) {
  const response = await api.get(`/room/specific/${roomId}`);
  
  return response.data;
}

export async function getBookingsByRoomId(token, roomId) {
  const response = await api.get(`/booking/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
  });
  
  return response.data;
};

export async function makeBooking(token, roomId) {
  const response = await api.post('/booking', { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getBookingByUser(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function updateBooking(token, roomId, bookingId) {
  const response = await api.put(`/booking/${bookingId}`, { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

