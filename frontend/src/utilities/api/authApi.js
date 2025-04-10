import axios from 'axios';

export const loginApi = async (loginData) => {
  try {
    const response = await axios.post('/api/v1/login', loginData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Неправильный логин или пароль');
  }
};

export const signUpApi = async (signUpData) => {
  try {
    const response = await axios.post('/api/v1/signup', {
      username: signUpData.username,
      password: signUpData.password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
};
