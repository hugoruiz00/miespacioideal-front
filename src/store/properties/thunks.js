import { getPropertiesApi } from "../../properties/api/propertiesApi";
import { setProperties, updateLoading } from "./propertiesSlice";

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
