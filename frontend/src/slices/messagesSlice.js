import { createSlice } from '@reduxjs/toolkit';
import sendMessageApi from '../utilities/sendMessageApi.js';

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
      .addCase(sendMessageApi.pending, (state) => {
        state.status = true;
        state.errors = null;
      })
      .addCase(sendMessageApi.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(sendMessageApi.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
