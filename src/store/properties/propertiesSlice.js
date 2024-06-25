import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  page: null,
  totalPages: null,
  error: null,
  loading: true,
  currentProperty: null,
  currentStep: 'step-one',
}

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,

  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload.data;
      state.loading = false;
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload.data;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
});

export const { updateLoading, setProperties, setCurrentProperty, setError, clearError } = propertiesSlice.actions;