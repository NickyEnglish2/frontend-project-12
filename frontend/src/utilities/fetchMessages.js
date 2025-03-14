import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  }
);
