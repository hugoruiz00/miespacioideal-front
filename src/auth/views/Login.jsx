import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openLoginGoogle, startLogin } from '../../store/auth/thunks';
import { FaCheck } from "react-icons/fa";
import Logo from '../../assets/svg/logo.svg';
import Google from '../../assets/svg/google.svg';
import { Loading } from '../../components/Loading';

export const Login = () => {

  const dispatch = useDispatch();
  
  const {loading} = useSelector(state => state.auth);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    dispatch(startLogin(payload));
  }

  return (
    <div className='py-12'>
      <h1 className="my-4 text-5xl font-bold text-[#FF5C00] md:hidden text-center mx-2">Mi espacio ideal</h1>
      <div className="flex flex-col md:flex-row sm:justify-evenly items-center pt-6 sm:pt-0 mx-5">
        <div className="flex flex-col items-center">
          <img src={Logo} className="App-logo" alt="logo" width={200}/>
          <div>
            <p className="my-6 text-2xl font-semibold text-[#5f5f5f]">
              <FaCheck className='inline mx-2 w-8 h-8 text-[#529F2D]'/>
              Publica tu casa, local, terreno, en venta, renta y más
            </p>
            <p className="my-6 text-2xl font-semibold text-[#5f5f5f]">
              <FaCheck className='inline mx-2 w-8 h-8 text-[#529F2D]'/>
              Consigue más clientes de forma rápida
            </p>
            <p className="my-6 text-2xl font-semibold text-[#5f5f5f]">
              <FaCheck className='inline mx-2 w-8 h-8 text-[#529F2D]'/>
              Administra de forma sencilla tus anuncios
            </p>
          </div>
        </div>

        <hr className="h-96 mx-6 border-2 border-[#BBBBBB] rounded-md hidden md:block" />

        <div className="flex flex-col items-center text-center">
          <h1 className="my-4 text-5xl font-bold text-[#FF5C00] hidden md:block">Mi espacio ideal</h1>
          <p className="my-4 text-2xl text-[#5F5F5F]">
            Comienza a publicar tus anuncios de <br/> forma <span className="font-bold">fácil</span> y <span className="font-bold">rápida</span>
          </p>
          <div>
            <button
              disabled={loading}
              onClick={() => dispatch(openLoginGoogle())}
              className="h-14 my-5 font-bold shadow-lg shadow-[#8b8b8b] inline-flex items-center px-4 py-2 bg-[#FFFFFF] border border-transparent rounded-md text-xs text--[#616161] uppercase tracking-widest hover:bg-[#dfdfdf] active:bg-[#dfdfdf] focus:outline-none ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
            >
              <img src={Google} width={25}/>
              <span className='ml-3'>Ingresa con tu cuenta de Google</span>
              {loading && <Loading className={'h-6 w-6 ml-2'}/>}
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className='login-signup-form animated faceInDown'>
    //   <div className='form'>
    //     <form onSubmit={onSubmit}>
    //       <h1 className='title'>Login into your account</h1>

    //       {error && 
    //         <div className='alert'>
    //           <p>{error}</p>
    //         </div>
    //       }

    //       <input ref={emailRef} type='email' placeholder='Email' />
    //       <input ref={passwordRef} type='password' placeholder='Password' />
    //       <button
    //         className='btn btn-block'
    //       >Login</button>

    //       <p className='message'>
    //         Not Registered? <Link to={'/signup'}>Create an account</Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>
  )
}
