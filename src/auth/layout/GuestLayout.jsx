import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const GuestLayout = () => {
  const {token} = useSelector(state => state.auth);
  
  if(token){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='min-h-screen bg-[#F3F3F3]'>
      <Outlet />
    </div>
  )
}
