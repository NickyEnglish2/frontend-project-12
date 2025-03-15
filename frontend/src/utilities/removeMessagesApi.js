import axios from 'axios';

export default async (messageId, token) => {
  try {
    const response = await axios.delete(`/api/v1/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Ошибка при удалении сообщения', err);
    throw err;
  }
};
