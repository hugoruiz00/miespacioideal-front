import { getPropertyTypesApi } from "../../properties/api/propertiesApi";
import { setPropertyTypes, updateLoading } from "./propertyTypesSlice";

export const startGettingPropertyTypes = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertyTypesApi();

    // if ( !result.ok ) return dispatch( errorOnAuth( result ) );
    if ( !result.ok ) return;

    console.log(result.data);
    dispatch( setPropertyTypes( result.data ));
  }
}
