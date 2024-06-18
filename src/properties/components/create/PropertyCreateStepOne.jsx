import React, { useState } from 'react'
import { Checkbox } from '../../../components/Checkbox';
import { TextInput } from '../../../components/TextInput';
import { PrimaryButton } from '../../../components/PrimaryButton';

export const PropertyCreateStepOne = () => {

  const [propertyTypeSelected, setPropertyTypeSelected] = useState(null);

  const propertyTypes = [
    { name: "Casa", id: 1 },
    { name: "Cuarto", id: 2 },
    { name: "Departamento", id: 3 },
    { name: "Bodega", id: 4 },
  ];

  return (
    <>
      <h1 className="text-2xl mb-5">¿Qué deseas publicar?</h1>
      <form> {/**wire:submit="save" */}
        <div>
          <p className="text-[#2D2D2D]">Tipo de propiedad</p>
          <div className="grid grid-cols-2 gap-2 my-4">
            {propertyTypes.map(propertyType => (
              <div
                key={propertyType.id}
                className={`bg-[#FFFFFF] text-[#4F4F4F] w-full h-12 p-2 rounded-md cursor-pointer shadow-md flex items-center
                                    ${propertyTypeSelected == propertyType.id ? 'border-[#FF5C00] border-2' : ''}`}
                onClick={() => setPropertyTypeSelected(propertyType.id)}
              >
                <p>{propertyType.name}</p>
              </div>
            ))}
          </div>
          {/* <x-input-error :messages="$errors->get('propertyCreate.propertyTypeId')" className="mt-2" /> */}
        </div>
        <div className="my-5">
          <p className="text-[#2D2D2D]">¿Qué tipo de anuncio desea realizar?</p>
          <div className="mt-1 mb-4">
            <label className="cursor-pointer mr-5">
              <Checkbox className={'mr-2'} name={'serviceTypes'} value={"1"} />
              <span className="text-[#4F4F4F]">Renta</span>
            </label>
            <label className='cursor-pointer '>
              <Checkbox className={'mr-2'} name={'serviceTypes'} value={"2"} />
              <span className="text-[#4F4F4F]">Venta</span>
            </label>
            {/* <x-input-error :messages="$errors->get('propertyCreate.serviceTypes')" className="mt-2" /> */}
          </div>
        </div>
        <div>
          <p className="text-[#2D2D2D]">¿Dónde se encuentra tu propiedad?</p>
          <TextInput className={'w-full'} placeholder={"Ingresa una dirección"} />
          {/* <x-input-error :messages="$errors->get('propertyCreate.address')" className="mt-2" /> */}
        </div>
        <PrimaryButton className={'mt-5'} type={'submit'}>
          Continuar
        </PrimaryButton>
      </form>
    </>
  )
}
