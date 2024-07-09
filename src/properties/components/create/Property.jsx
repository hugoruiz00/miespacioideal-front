import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getProperty } from '../../../store/properties/propertiesThunks';

export const Property = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!params.propertyId) return;

    const fetchProperty = async () => {
      const res = await dispatch(getProperty(params.propertyId));
      if(!res){
        navigate(`/property/step-one`);
      }
    };

    fetchProperty();
  }, [dispatch, params]);

  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className='flex'>
          <div className='w-2/12'>

          </div>
          <div className='w-9/12'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
