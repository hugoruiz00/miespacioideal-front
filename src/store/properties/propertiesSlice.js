import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  paginationData: null,
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
      state.paginationData = {
        currentPage: action.payload.meta.current_page,
        lastPage: action.payload.meta.last_page
      };
      state.loading = false;
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
      state.loading = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
});

export const { updateLoading, setProperties, setCurrentProperty, setCurrentStep, setError, clearError } = propertiesSlice.actions;