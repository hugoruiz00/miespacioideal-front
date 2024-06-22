import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { propertiesSlice } from './properties/propertiesSlice';
import { propertyTypesSlice } from './properties/propertyTypesSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    properties: propertiesSlice.reducer,
    propertyTypes: propertyTypesSlice.reducer
  }
});