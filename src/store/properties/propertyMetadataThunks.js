import { getContactNumbersByUserApi, getDetailsApi, getPaymentFrequenciesApi, getPropertyTypesApi } from "../../properties/api/propertiesApi";
import { setError } from "./propertiesSlice";
import { setContactNumbers, setDetails, setPaymentFrequencies, setPropertyTypes, updateLoading } from "./propertyMetadataSlice";

export const getPropertyTypes = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPropertyTypesApi();

    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setPropertyTypes( result.data ));
  }
}

export const getPaymentFrequencies = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getPaymentFrequenciesApi();
    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setPaymentFrequencies( result.data ));
  }
}

export const getContactNumbers = () => {
  return async( dispatch, getState ) => {
    dispatch( updateLoading(true) );

    const {user} = getState().auth;

    const result = await getContactNumbersByUserApi(user.id);
    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setContactNumbers( result.data ));
  }
}

export const getDetails = () => {
  return async( dispatch ) => {
    dispatch( updateLoading(true) );

    const result = await getDetailsApi();
    if ( !result.ok ) return dispatch( setError( result.error ) );

    dispatch( setDetails( result.data ));
  }
}
