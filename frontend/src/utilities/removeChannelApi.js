import axios from 'axios';

export default async (channelId, token) => {
  try {
    const response = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Ошибка при удалении канала', err);
    throw err;
  }
};
