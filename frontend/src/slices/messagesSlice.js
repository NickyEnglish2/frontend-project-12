import { createSlice } from '@reduxjs/toolkit';
import fetchMessages from '../utilities/fetchMessages.js';

const initialState = {
  messages: [],
  status: 'idle', // idle, loading, success, failed
  errors: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = true;
        state.errors = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.status = 'success';
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
