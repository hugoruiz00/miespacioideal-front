import { createPropertyApi, getPropertiesApi } from "../../properties/api/propertiesApi";
import { setError, setProperties, updateLoading } from "./propertiesSlice";

export const startGettingProperties = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertiesApi();

    if ( !result.ok ) return dispatch( setError( result.error ) );

    console.log(result.data);
    dispatch( setProperties( result.data ));
  }
}

export const startCreatingProperty = (data, step) => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    // const {currentProperty} = getState().properties;
    data.propertyId = 9;
    const result = await createPropertyApi(data, step);

    console.log(result);
    if ( !result.ok ) return dispatch( setError( result.error ) );
    // dispatch( login( result ));
  }
}
