import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertyTypes: [],
  paymentFrequencies: [],
  contactNumbers: [],
  error: null,
  loading: true
}

export const propertyMetadataSlice = createSlice({
  name: 'propertyMetadata',
  initialState,

  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPropertyTypes: (state, action) => {
      state.propertyTypes = action.payload.data;
      state.loading = false;
    },
    setPaymentFrequencies: (state, action) => {
      state.paymentFrequencies = action.payload.data;
      state.loading = false;
    },
    setContactNumbers: (state, action) => {
      state.contactNumbers = action.payload.data;
      state.loading = false;
    },
  }
});

export const { updateLoading, setPropertyTypes, setPaymentFrequencies, setContactNumbers } = propertyMetadataSlice.actions;