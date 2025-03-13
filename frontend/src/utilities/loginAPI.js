import axios from 'axios';

export default async (loginData) => {
  try {
    const response = await axios.post('/api/v1/login', loginData);
    return response.data.token;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Неправильный логин или пароль');
  }
};
