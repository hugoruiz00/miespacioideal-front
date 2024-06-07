import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null;

const initialState = {
  user: null,
  token,
  notification: '',
  error: null,
  loading: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    checkingCredentials: (state) => {
      state.loading = true;
    },
    errorOnAuth: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
      state.user = null;
      state.token = null;
    }
  }
});

export const { login, setUser, logout, checkingCredentials, errorOnAuth } = authSlice.actions;