import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { propertiesSlice } from './properties/propertiesSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    properties: propertiesSlice.reducer
  }
});