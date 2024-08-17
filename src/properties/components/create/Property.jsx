import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getOwnerProperty } from '../../../store/properties/propertiesThunks';
import { setCurrentProperty } from '../../../store/properties/propertiesSlice';

export const Property = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!params.propertyId) return;

    const fetchProperty = async () => {
      const res = await dispatch(getOwnerProperty(params.propertyId));
      if(!res){
        navigate(`/property/step-one`);
      }
    };

    fetchProperty();
  }, [dispatch, params]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentProperty(null));
    };
  }, [dispatch]);

  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className='flex'>
          {/* <div className='w-2/12'>

          </div> */}
          <div className='w-full mx-3 md:mx-12'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
