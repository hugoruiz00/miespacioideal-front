import axiosClient from "../../helpers/axios-client";

export const loginApi = async (email, password) => {
  try {
    const res = await axiosClient.post('/login', {email, password});

    return {
      ok: true,
      token: res.data.user,
      token: res.data.token,
    }
  } catch (error) {
    const response = error.response;

    let errorMessage = "Ha ocurrido un error";
    if(response && response.status == 422){
      errorMessage = response.data.message;
    }

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const signupApi = async (name, email, password, password_confirmation) => {
  try {
    const res = await axiosClient.post('/signup', {name, email, password, password_confirmation});

    return {
      ok: true,
      token: res.data.user,
      token: res.data.token,
    }
  } catch (error) {
    const response = error.response;

    let errorMessage = "Ha ocurrido un error";
    if(response && response.status == 422){
      errorMessage = response.data.message;
    }

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const logoutApi = async () => {
  try {
    await axiosClient.post('/logout');
  } catch (error) {
    
  }
}

export const getUrlLoginGoogleApi = async () => {
  try {
    const res = await axiosClient.get('/login/google');

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    console.log(error);
    const response = error.response;

    let errorMessage = "Ha ocurrido un error";
    if(response && response.status == 422){
      errorMessage = response.data.message;
    }

    return {
      ok: false,
      error: errorMessage,
    }
  }
}

export const loginGoogleApi = async (query) => {
  try {
    const res = await axiosClient.get(`/login/google/callback${query}`);

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    console.log(error);
    const response = error.response;

    let errorMessage = "Ha ocurrido un error";
    if(response && response.status == 422){
      errorMessage = response.data.message;
    }

    return {
      ok: false,
      error: errorMessage,
    }
  }
}


export const getUserApi = async () => {
  try {
    const res = await axiosClient.get('/user');

    return {
      ok: true,
      data: res.data,
    }
  } catch (error) {
    console.log(error);
    const response = error.response;

    let errorMessage = "Ha ocurrido un error";
    if(response && response.status == 422){
      errorMessage = response.data.message;
    }

    return {
      ok: false,
      error: errorMessage,
    }
  }
}