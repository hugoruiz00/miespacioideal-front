// import axiosClient from "../../helpers/axios-client";

// export const loginApi = async (email, password) => {
//   try {
//     const res = await axiosClient.post('/login', {email, password});

//     return {
//       ok: true,
//       token: res.data.user,
//       token: res.data.token,
//     }
//   } catch (error) {
//     const response = error.response;

//     let errorMessage = "Ha ocurrido un error";
//     if(response && response.status == 422){
//       errorMessage = response.data.message;
//     }

//     return {
//       ok: false,
//       error: errorMessage,
//     }
//   }
// }
