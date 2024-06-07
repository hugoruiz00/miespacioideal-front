import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  page: null,
  totalPages: null,
  error: null,
  loading: true
}

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,

  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
  }
});

export const { updateLoading, setProperties } = propertiesSlice.actions;