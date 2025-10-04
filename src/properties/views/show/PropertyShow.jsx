import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProperty } from '../../../store/properties/propertiesThunks';
import { setCurrentProperty } from '../../../store/properties/propertiesSlice';
import { ImageSlider } from '../../components/ImageSlider';
import { LoadingCenter } from '../../../components/LoadingCenter';

export const PropertyShow = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentProperty, loading, error} = useSelector(state => state.properties);

  useEffect(() => {
    if(!params.propertyId) return navigate(`/`);;

    const fetchProperty = async () => {
      const res = await dispatch(getProperty(params.propertyId));
      if(!res){
        navigate(`/`);
      }
    };

    fetchProperty();
  }, [dispatch, params]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentProperty(null));
    };
  }, [dispatch]);

  const getServiceTypeNames = (serviceTypes) => {
    if(!serviceTypes) return "";
  
    let services =  serviceTypes.reduce((names, item) => names + item.name + ", ", "");
    services = services.substring(0, services.length - 2);
    return services;
  }

  if(!currentProperty) return <LoadingCenter />

  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className='flex'>
          {/* <div className='w-2/12'>
          </div> */}
          <div className='w-full mx-3 md:mx-12 flex flex-col md:flex-row'>

            <ImageSlider
              className={'w-full md:w-3/4'}
              images={currentProperty.images}
              property={currentProperty}
            />

            <div className='ml-7'>
              <p className='font-semibold text-xl'>
                {currentProperty.property_type?.name} en {getServiceTypeNames(currentProperty.service_types)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
