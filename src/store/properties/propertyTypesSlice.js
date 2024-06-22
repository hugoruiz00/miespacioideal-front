import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertyTypes: [],
  error: null,
  loading: true
}

export const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState,

  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPropertyTypes: (state, action) => {
      state.propertyTypes = action.payload.data;
      state.loading = false;
    },
  }
});

export const { updateLoading, setPropertyTypes } = propertyTypesSlice.actions;