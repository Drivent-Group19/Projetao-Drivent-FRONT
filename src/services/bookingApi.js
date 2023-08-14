import api from './api';

export async function getBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createBooking(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function changeBooking(body, token, id) {
  const response = await api.put(`/booking/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
