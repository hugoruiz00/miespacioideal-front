import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { BackendErrorMessage } from '../components/BackendErrorMessage';
import { clearError } from '../store/auth/authSlice';
import { Navbar } from '../components/navbar/Navbar';

export const GuestLayout = () => {
  const dispatch = useDispatch();
  const {token, error} = useSelector(state => state.auth);
  
  if(token){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='min-h-screen bg-[#F3F3F3]'>
      <Navbar />

      <Outlet />

      {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}
    </div>
  )
}
