import { getContactNumbersByUserApi, getPaymentFrequenciesApi, getPropertyTypesApi } from "../../properties/api/propertiesApi";
import { setError } from "./propertiesSlice";
import { setContactNumbers, setPaymentFrequencies, setPropertyTypes, updateLoading } from "./propertyMetadataSlice";

export const startGettingPropertyTypes = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertyTypesApi();

    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setPropertyTypes( result.data ));
  }
}

export const startGettingPaymentFrequencies = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPaymentFrequenciesApi();
    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setPaymentFrequencies( result.data ));
  }
}

export const startGettingContactNumbers = () => {
  return async( dispatch, getState ) => {
    dispatch( updateLoading(true) );

    const {user} = getState().auth;

    const result = await getContactNumbersByUserApi(user.id);
    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setContactNumbers( result.data ));
  }
}
