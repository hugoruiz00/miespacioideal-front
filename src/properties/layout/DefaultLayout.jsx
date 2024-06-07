import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startGetUser } from '../../store/auth/thunks';
import { Navbar } from '../../components/navbar/Navbar';

export const DefaultLayout = () => {
  const dispatch = useDispatch();
  const {token, notification} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startGetUser());
  }, []);

  if(!token){
    return <Navigate to={'/login'}/>
  }
  
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
{/* 
      {notification && 
        <div className='notification'>
        {notification}
        </div>
      } */}
    </div>
  )
}
