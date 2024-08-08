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

export const signup = ({name, email, password, password_confirmation}) => {
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

export const loginGoogle = (query) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await loginGoogleApi(query);
    if ( !result.ok ) return dispatch( errorOnAuth( result ) );

    localStorage.setItem('ACCESS_TOKEN', result.data.token);
    dispatch( login( result.data ));
  }
}

export const getUser = () => {
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

//* SEPARAR EN COMPONENTES LAS PROPIEDADES EN EL HOME
//* ENVIAR EL MANEJO DE ERRORES DE LOS API A UN HELPER
//* Vista de progreso lateral de steps
//* MANEJAR CONSTANTES PARA LOS STEP
//* Por ahora no se implementarán filtros complejos de categorías y eso. Solo será un filtro de un input text.
// Responsivo (revisar si hay que agregar el botón de ingresar ahí)
// validaciones y restricciones de roles.
// Poder acceder a propiedades sin estar loggeado
// Botón de regresar en crear en steps
// Buscador en el home