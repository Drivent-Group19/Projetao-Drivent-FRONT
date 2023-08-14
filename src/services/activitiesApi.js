import api from './api';

export async function getActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createActivity(token, activityId) {
  const response = await api.post('/activities/booking', { activityId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
