import { getUrlLoginGoogleApi, getUserApi, loginApi, loginGoogleApi, logoutApi, signupApi } from "../../auth/api/authApi";
import { checkingCredentials, errorOnAuth, login, logout, setUser } from "./authSlice";

export const startLogin = ({email, password}) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await loginApi(email, password);

    if ( !result.ok ) return dispatch( errorOnAuth( result ) );

    localStorage.setItem('ACCESS_TOKEN', result.token);
    dispatch( login( result ));
  }
}

export const startSignup = ({name, email, password, password_confirmation}) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await signupApi(name, email, password, password_confirmation);

    if ( !result.ok ) return dispatch( errorOnAuth( result ) );

    localStorage.setItem('ACCESS_TOKEN', result.token);
    dispatch( login( result ));
  }
}

export const startLogout = () => {
  return async( dispatch ) => {
    await logoutApi();
    
    localStorage.removeItem('ACCESS_TOKEN');
    dispatch( logout() );
  }
}

export const openLoginGoogle = () => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );
    
    const result = await getUrlLoginGoogleApi();

    if ( !result.ok ) return dispatch( errorOnAuth( result ) );

    window.open(result.data, "_top");;
  }
}

export const startLoginGoogle = (query) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await loginGoogleApi(query);
    if ( !result.ok ) return dispatch( errorOnAuth( result ) );

    localStorage.setItem('ACCESS_TOKEN', result.data.token);
    dispatch( login( result.data ));
  }
}

export const startGetUser = () => {
  return async( dispatch ) => {

    const result = await getUserApi();
    if ( !result.ok ) return dispatch( errorOnAuth( result ) );

    dispatch( setUser( result.data ));
  }
}

// const setNotification = (message) => {
//   _setNotification(message);
//   setTimeout(() => {
//     _setNotification('');
//   }, 5000);
// }


// TAILWINDCSS
// NOTIFICATION
// LOADING
// REACT HOOK FORM
// MANEJAR SI HAY ERROR AL CARGAR LAS PROPIEDADES EN EL HOME
// CLICK OUTSIDE PARA EL DROPDOWN DEL HEADER
// SEPARAR EN COMPONENTES LAS PROPIEDADES EN EL HOME

// ** Continuar con el método create.
// También sería buena idea crear una clase para retornar las rutas y no estar usando el env.META etc.