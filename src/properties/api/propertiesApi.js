import axiosClient from "../../helpers/axios-client";

export const getPropertiesApi = async (page) => {
  try {
    const res = await axiosClient.get(`/properties?page=${page}`);

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "Ha ocurrido un error al consultar";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const getOwnerPropertiesApi = async () => {
  try {
    const res = await axiosClient.get('/owner/properties');

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "Ha ocurrido un error";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const getOwnerPropertyApi = async (propertyId) => {
  try {
    const res = await axiosClient.get(`/owner/properties/${propertyId}`);

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "No se pudo consultar la información";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const createOwnerPropertyApi = async (data, step) => {
  try {
    const res = await axiosClient.post(`/owner/properties/create/${step}`, data);

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    const response = error.response;
    let errorMessage = "Ha ocurrido un error";

    if(response){
      errorMessage = response.data.message;
    }

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const getContactNumbersByUserApi = async (userId) => {
  try {
    const res = await axiosClient.get(`/owner/contact-numbers/${userId}`);

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "Ha ocurrido un error";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const getPropertyTypesApi = async () => {
  try {
    const res = await axiosClient.get('/property-types');

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "Ha ocurrido un error";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const getPaymentFrequenciesApi = async () => {
  try {
    const res = await axiosClient.get('/payment-frequencies');

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "Ha ocurrido un error";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const getDetailsApi = async () => {
  try {
    const res = await axiosClient.get('/details');

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    let errorMessage = "Ha ocurrido un error";

    return {
      ok: false,
      error: errorMessage,
    }
  }
}