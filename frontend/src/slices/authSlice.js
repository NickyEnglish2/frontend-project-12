import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle', // idle, loading, success, failed
  errors: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
      state.errors = null;
    },
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.status = 'success';
      state.errors = null;
      localStorage.setItem('token', action.payload);
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.errors = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
