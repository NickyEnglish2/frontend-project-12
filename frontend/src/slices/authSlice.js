/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle', // idle, loading, success, failed
  loginErr: null,
  signUpErr: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
      state.loginErr = null;
      state.signUpErr = null;
    },
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.status = 'success';
      state.loginErr = null;
      state.signUpErr = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.loginErr = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    signUpFailure(state, action) {
      state.status = 'failed';
      state.signUpErr = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    logout(state) {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      state.loginErr = null;
      state.signUpErr = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signUpFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
