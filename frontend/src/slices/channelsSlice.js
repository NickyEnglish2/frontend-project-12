import { createSlice } from '@reduxjs/toolkit';
import fetchChannels from '../utilities/fetchChannels';

const initialState = {
  channels: [],
  currentChannelId: null,
  status: 'idle', // idle, loading, success, failed
  errors: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    removeChannel(state, action) {
      state.channels = state.channels.filter((ch) => ch.id !== action.payload);
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.channels = action.payload;
        state.currentChannelId = action.payload[0]?.id || null;
        state.status = 'success';
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      });
  },
});

export const { setCurrentChannel, addChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
