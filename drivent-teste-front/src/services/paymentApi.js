import api from './api';

export async function reserveTicket(body, token) {
  const response = await api.post('/tickets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export async function makePayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
// export async function getPersonalInformations(token) {
// const response = await api.get('/enrollments', {
//     headers: {
//     Authorization: `Bearer ${token}`,
//     },
// });

// return response.data;
// }
