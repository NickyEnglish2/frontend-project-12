import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);
