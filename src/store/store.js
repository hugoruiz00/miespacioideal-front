import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { propertiesSlice } from './properties/propertiesSlice';
import { propertyMetadataSlice } from './properties/propertyMetadataSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    properties: propertiesSlice.reducer,
    propertyMetadata: propertyMetadataSlice.reducer
  }
});