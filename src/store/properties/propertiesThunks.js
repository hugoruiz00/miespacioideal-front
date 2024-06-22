import { createPropertyApi, getPropertiesApi } from "../../properties/api/propertiesApi";
import { setError, setProperties, updateLoading } from "./propertiesSlice";

export const startGettingProperties = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertiesApi();

    // if ( !result.ok ) return dispatch( errorOnAuth( result ) );
    if ( !result.ok ) return;

    console.log(result.data);
    dispatch( setProperties( result.data ));
  }
}

export const startCreatingProperty = (data, step) => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await createPropertyApi(data, step);

    console.log(result);
    if ( !result.ok ) return dispatch( setError( result ) );
    // dispatch( login( result ));
  }
}
