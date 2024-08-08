import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/auth/thunks';
import { Navbar } from '../components/navbar/Navbar';

export const GeneralLayout = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    if(token){
      dispatch(getUser());
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar />
      <div>
        <main>
          <Outlet />
        </main>
      </div>

      {/* {notification && 
        <div className='fixed right-4 bottom-4 z-[100] py-4 px-6 bg-[#00a762] text-white rounded-md'>
          {notification}
        </div>
      } */}
    </div>
  )
}
