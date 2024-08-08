import { useEffect } from "react";
import { FaSearch, FaRegBookmark, FaPhoneAlt  } from "react-icons/fa";
import { getProperties } from "../store/properties/propertiesThunks";
import { useDispatch, useSelector } from "react-redux";
import {detailIcons} from '../properties/components/IconsPropertyDetail';
import { PrimaryButton } from "../components/PrimaryButton";
import { BackendErrorMessage } from "../components/BackendErrorMessage";
import { clearError } from "../store/properties/propertiesSlice";
import { TbHomeSearch } from "react-icons/tb";
import { LoadingCenter } from "../components/LoadingCenter";
import { Pagination } from "../components/Pagination";

const getServiceTypeNames = (serviceTypes) => {
  if(!serviceTypes) return "";

  return serviceTypes.reduce((names, item) => names + item.name, "");                        
}

const getFirstImage = (images) => {
  if(!images || images.length == 0) return "";

  return images[0].image_url;
}

export const Home = () => {

  const dispatch = useDispatch();
  const {properties, paginationData, loading, error} = useSelector(state => state.properties);

  useEffect(() => {
    changePage(1);
  }, [])

  const changePage = (page) => {
    dispatch(getProperties(page));
  }

  if(loading){
    return <LoadingCenter loadingClass="h-10 w-10" />
  }
  
  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className='flex'>
          {/* <div className='hidden sm:block sm:w-2/12'>

          </div> */}
          <div className='w-full mx-2'>
            <form className="flex items-center mx-2">   
              <label htmlFor="voice-search" className="sr-only">Buscar</label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <FaSearch className='text-gray-400 h-5 w-5'/>
                </div>
                <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF5C00] focus:border-[#FF5C00] block w-full pl-10 p-2.5"
                    placeholder="Buscar..."/>
              </div>  
              <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-[#FF5C00] rounded-lg border hover:bg-[#CF4D04]">Buscar</button>
            </form>

            { properties.length == 0 &&
              <div className="text-center justify-center text-gray-500 font-medium mt-12">
                <p className="text-xl">No se han encontrado propiedades</p>
                <TbHomeSearch className="mx-auto size-28 my-7 mb-2"/>
                <p className="text-lg">Parece que no hay propiedades disponibles</p>
              </div>
            }

            <section className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {
                properties.map(property => (                  
                  <div key={property.id}>
                      <div className="bg-white shadow-md rounded-md my-2 mx-2">
                          <img className="rounded-md" src={`${import.meta.env.VITE_API_BASE_URL}${getFirstImage(property.images)}`} alt={property.property_type?.name} />
                          <div className="p-3">
                              <p>{property.property_type?.name} en {getServiceTypeNames(property.service_types)}</p>
                              <p className="text-[#5F5F5F]">{property['address']}</p>
                              <p><span className="font-medium">${property.price}</span> {property.payment_frequency?.frequency}</p>
                              <div className="flex flex-wrap items-center">
                                {
                                  property.details.slice(0, 5).map(detail => {
                                    const Icon = detailIcons[detail.icon];

                                    return (
                                      <div key={detail.id} className="flex items-center">
                                        <span title={detail.detail}>
                                          <Icon className='h-4 w-4' />
                                        </span>
                                        <p className="mr-3 text-gray-800">
                                          { detail.datatype==='integer' && detail.pivot.value }
                                        </p>
                                      </div>
                                    )
                                  })
                                }                                  
                              </div>
                              <hr className="my-2" />
                              <div className="flex items-center justify-between">
                                  <button title="Guardar">
                                      <FaRegBookmark className='h-5 w-5'/>
                                  </button>
                                  <PrimaryButton
                                    type={'submit'}
                                    className="h-7"
                                    title="Ver número de contacto"
                                  >
                                    <FaPhoneAlt  className='h-3 w-3 mr-1' />
                                    Contacto
                                  </PrimaryButton>
                              </div>
                          </div>
                      </div>
                  </div>
                ))
              }
            </section>

            {paginationData && <Pagination paginationData={paginationData} onChangePage={changePage}/>}
          </div>
        </div>
      </div>
      {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}
    </div>
  )
}
