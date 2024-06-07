import { FaSearch } from "react-icons/fa";

export const Home = () => {
  
  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className='flex'>
          <div className='w-2/12'>
              
          </div>
          <div className='w-9/12'>
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
                    placeholder="Buscar cuartos en renta, casas en venta..."/>
              </div>  
              <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-[#FF5C00] rounded-lg border hover:bg-[#CF4D04]">Buscar</button>
            </form>

            <section className="flex justify-between flex-wrap mt-3">
              {/* @foreach ($properties as $property)
                  <div className="w-1/3">
                      <div className="bg-white shadow-md rounded-md my-2 mx-2">
                          <img className="rounded-md" src="{{asset('storage/home.jpg')}}" alt="data-{{$loop->iteration}}">
                          <div className="p-3">
                              @php
                                  $serviceTypes = "";
                                  foreach ($property->serviceTypes as $serviceType) {
                                      $serviceTypes .= $serviceType->name;
                                  }
                              @endphp
                              <p>{{$property->propertyType->name}} en {{$serviceTypes}}</p>
                              <p className="text-[#5F5F5F]">{{$property->address}}</p>
                              <p><span className="font-medium">${{$property->price}}</span> {{$property->paymentFrequency->frequency}}</p>
                              <div className="flex flex-wrap items-center">
                                  @foreach ($property->details as $detail)
                                      @if ($loop->iteration > 5)
                                          @break;
                                      @endif
                                      <span title="{{$detail->detail}}">
                                          @svg("icondetails.$detail->icon", 'h-4 w-4')
                                      </span>
                                      <p className="mr-3">
                                          @if ($detail->datatype==='integer')
                                              {{$detail->pivot->value}}
                                          @endif
                                      </p>
                                  @endforeach
                              </div>
                              <hr className="my-2">
                              <div className="flex items-center justify-between">
                                  <button title="Guardar">
                                      @svg('fa-bookmark', 'h-5 w-5')
                                  </button>
                                  <x-primary-button className="h-7" title="Ver número de contacto">
                                      @svg('fa-phone', 'h-3 w-3 mr-1')
                                      Contacto
                                  </x-primary-button>
                              </div>
                          </div>
                      </div>
                  </div>
              @endforeach */}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
