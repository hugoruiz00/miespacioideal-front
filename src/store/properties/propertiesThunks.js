import { createOwnerPropertyApi, getPropertiesApi, getOwnerPropertyApi } from "../../properties/api/propertiesApi";
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

export const getOwnerProperty = (propertyId) => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getOwnerPropertyApi(propertyId);

    if ( !result.ok ){
      dispatch( setError( result.error ) );
      return false;
    }

    dispatch( setCurrentProperty( result.data ));
    return true;
  }
}

export const createOwnerProperty = (data, step) => {
  return async( dispatch, getState ) => {
    dispatch( updateLoading(true) );

    const {currentProperty} = getState().properties;
    if(currentProperty){
      data = addPropertyId(step, data, currentProperty.id);
    }
    const result = await createOwnerPropertyApi(data, step);

    if ( !result.ok ) {
      dispatch( setError( result.error ) );
      return false;
    }
    
    dispatch( updateLoading(false) );
    return result.data.data;
  }
}

const addPropertyId = (step, data, propertyId) => {
  if(step == 'step-three'){
    data.append('propertyId', propertyId);
  }else{
    data.propertyId = propertyId;
  }

  return data;
}
