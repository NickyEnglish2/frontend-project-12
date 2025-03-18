import axios from 'axios';

export default async (signUpData) => {
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
