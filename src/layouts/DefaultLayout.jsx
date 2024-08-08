import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/auth/thunks';
import { Navbar } from '../components/navbar/Navbar';
import { LoadingCenter } from '../components/LoadingCenter';

export const DefaultLayout = () => {
  const dispatch = useDispatch();
  const {token, notification, user} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if(!token){
    return <Navigate to={'/login'}/>
  }
  
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar />
      <div>
        <main>
          { user ? 
            <Outlet /> :
            <LoadingCenter />
          }
        </main>
      </div>

      {notification && 
        <div className='fixed right-4 bottom-4 z-[100] py-4 px-6 bg-[#00a762] text-white rounded-md'>
          {notification}
        </div>
      }
    </div>
  )
}
