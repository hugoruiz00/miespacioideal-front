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
