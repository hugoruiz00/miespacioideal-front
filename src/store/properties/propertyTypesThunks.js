import { getPropertyTypesApi } from "../../properties/api/propertiesApi";
import { setError } from "./propertiesSlice";
import { setPropertyTypes, updateLoading } from "./propertyTypesSlice";

export const startGettingPropertyTypes = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertyTypesApi();

    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setPropertyTypes( result.data ));
  }
}
