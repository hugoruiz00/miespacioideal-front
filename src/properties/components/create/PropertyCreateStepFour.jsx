import { FaSearch } from "react-icons/fa"
import {detailIcons} from '../../components/IconsPropertyDetail';
import { PrimaryButton } from "../../../components/PrimaryButton";
import { PiChatText, PiPencilSimple, PiXCircle } from "react-icons/pi";

export const PropertyCreateStepFour = () => {

  const details = [
    {icon:'RiFireLine', detail:"Casa", id: 1},
    {icon:'RiFireLine', detail:"Cuarto", id: 2},
    {icon:'RiFireLine', detail:"Departamento", id: 3},
    {icon:'RiFireLine', detail:"Bodega", id: 4},
  ];

  return (
    <div>
      <h1 className="text-2xl mb-2">Detalles de la propiedad (opcional)</h1>
      <p className="text-lg text-[#4F4F4F] mb-5">Agrega otros detalles para que las personas encuentren
        tu propiedad con mayor facilidad</p>
      <form>
        <div className="relative"> {/** x-data="{selectedDetail: {}}" */}
          <p className="mb-1 text-[#2D2D2D]">Selecciona los detalles</p>
          <label htmlFor="voice-search" className="sr-only">Buscar</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FaSearch className='text-gray-400 h-5 w-5' />
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF5C00] focus:border-[#FF5C00] block w-full pl-10 p-2"
              placeholder="Buscar más detalles..."/>
          </div>

          <div className="my-4">
            {
              details.map(detail => {
                const Icon = detailIcons[detail.icon];
                return (
                  <div
                    key={detail.id}
                    className="flex justify-between items-center bg-white shadow-md rounded-sm p-2 mb-2"
                  >
                    <div className="flex">
                      <span title={detail.detail}>
                        <Icon className='text-[#4F4F4F] h-5 w-5'/>
                      </span>
                      <p className="text-[#4F4F4F] font-medium ml-4">{detail.detail}</p>
                    </div>
                    <span className="cursor-pointer"
                    >{/** x-on:click="$dispatch('open-modal', 'add-property-modal'); selectedDetail={{$detail}}" */}
                      {/* @svg('ph-plus-circle', 'text-[#3F3F3F] h-6 w-6') */}
                    </span>
                  </div>
                )
              })
            }            
          </div>

          {/* <x-modal name="add-property-modal" maxWidth="md">
            <div className="px-5 py-8 text-center">
              <p className="text-lg mb-4" x-text="selectedDetail['detail']"></p>
              <x-text-input className="w-full mb-3" name="cantidad" placeholder="Ingrese una cantidad" />
              <p x-text="selectedDetail['detail']"></p>
              <span className="text-sm">Escribe un comentario sobre esta característica (opcional)</span>
              <x-textarea-input className="w-full mb-3" x-bind:placeholder="'Comentarios sobre el ' + selectedDetail['detail'].toLowerCase()">
              </x-textarea-input>
          
              <x-primary-button className="" type="button">Agregar</x-primary-button>
            </div>
          </x-modal> */}

          <p className="text-lg">Detalles agregados</p>
          <div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-sm p-2 mb-2">
              <div className="flex">
                <span title="kkk">
                  {/* @svg("icondetails.kkk", 'text-[#4F4F4F] h-5 w-5') */}
                </span>
                <p className="text-[#4F4F4F] font-medium ml-4">kkk</p>
              </div>
              <div className="flex space-x-6 items-center">
                <span className="cursor-pointer" title="Comentarios">
                  <PiChatText className='h-6 w-6'/>
                </span>
                <span className="cursor-pointer" title="Editar">
                  <PiPencilSimple className='h-6 w-6'/>
                </span>
                <span className="cursor-pointer" title="Quitar">
                  <PiXCircle className='text-[#B92727] h-6 w-6'/>
                </span>
              </div>
            </div>
          </div>
        </div>
        <PrimaryButton className={'mt-5'} type="submit">
          Publicar propiedad
        </PrimaryButton>
      </form>
    </div>
  )
}
