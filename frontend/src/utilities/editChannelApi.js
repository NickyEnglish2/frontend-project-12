import axios from 'axios';

export default async (channelId, name, token) => {
  try {
    const response = await axios.patch(`/api/v1/channels/${channelId}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Ошибка при редактировании поста:', err);
    throw err;
  }
};
