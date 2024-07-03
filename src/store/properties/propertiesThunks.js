import { createPropertyApi, getPropertiesApi, getPropertyApi } from "../../properties/api/propertiesApi";
import { setCurrentProperty, setCurrentStep, setError, setProperties, updateLoading } from "./propertiesSlice";

export const getProperties = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertiesApi();

    if ( !result.ok ) return dispatch( setError( result.error ) );

    console.log(result.data);
    dispatch( setProperties( result.data ));
  }
}

export const getProperty = (propertyId) => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertyApi(propertyId);

    if ( !result.ok ){
      dispatch( setError( result.error ) );
      return false;
    }

    dispatch( setCurrentProperty( result.data ));
    return true;
  }
}

export const createProperty = (data, step) => {
  return async( dispatch, getState ) => {
    dispatch( updateLoading(true) );

    const {currentProperty} = getState().properties;
    if(currentProperty){
      data.propertyId = currentProperty.id;
    }
    const result = await createPropertyApi(data, step);

    if ( !result.ok ) {
      dispatch( setError( result.error ) );
      return false;
    }
    
    dispatch( updateLoading(false) );
    return result.data.data;
  }
}
