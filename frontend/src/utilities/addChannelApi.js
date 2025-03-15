import axios from 'axios';

export default async (name, token) => {
  try {
    const newChannel = { name };
    const response = await axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Ошибка при создании канала', err);
    throw err;
  }
};
