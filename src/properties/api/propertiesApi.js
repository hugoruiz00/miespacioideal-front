import axiosClient from "../../helpers/axios-client";

export const getPropertiesApi = async () => {
  try {
    const res = await axiosClient.get('/properties');

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

export const createPropertyApi = async (data, step) => {
  try {
    const res = await axiosClient.post(`/properties/create/${step}`, data);

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

export const getContactNumbersByUserApi = async (userId) => {
  try {
    const res = await axiosClient.get(`/contact-numbers/${userId}`);

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