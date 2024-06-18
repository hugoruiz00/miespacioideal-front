import { useState } from "react"
import { TextArea } from "../../../components/TextArea";
import { TextInput } from "../../../components/TextInput";
import { SecondaryButton } from "../../../components/SecondaryButton";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const PropertyCreateStepTwo = () => {

  const [open, setOpen] = useState(false);
  const [numberInput, setNumberInput] = useState('');
  const [selectedContactNumbers, setSelectedContactNumbers] = useState([]);
  const [divNumbersRef] = useClickOutside(setOpen);

  const paymentFrequencies = [
    {frequency:"Día", id: 1},
    {frequency:"Mes", id: 2},
    {frequency:"Año", id: 3},
  ];

  const userNumbers = [
    {contact_number:"2321312", id: 1},
    {contact_number:"2342343", id: 2},
    {contact_number:"5567677", id: 3},
  ];

  const addContactNumber = () => {
    if(numberInput!=null && numberInput.trim().length > 7){
      let seleccionado = selectedContactNumbers.find((number) => number == numberInput.trim());
      if(!seleccionado){
        setSelectedContactNumbers([...selectedContactNumbers, numberInput.trim()]);
      }
      setNumberInput('');
    }
  }

  const selectContactNumber = (contactNumber) => {
    setOpen(!open);
    let seleccionado = selectedContactNumbers.find((number) => number == contactNumber);
    if(!seleccionado){
      setSelectedContactNumbers([...selectedContactNumbers, contactNumber]);
    }
  }

  const removeContactNumber = (contactNumber) => {
    setSelectedContactNumbers(selectedContactNumbers.filter((number) => number != contactNumber));
  }

  return (
    <div>
      <h1 className="text-2xl mb-5">Describe tu propiedad</h1>
      <form>  {/**wire:submit="save" */}
        <div>
          <p className="text-[#2D2D2D]">Descripción</p>
          <TextArea
            className={'w-full'}
            placeholder={"Escribe sobre tu propiedad"}
          ></TextArea>
          {/* <x-input-error :messages="$errors->get('stepTwoForm.description')" className="mt-1" /> */}
        </div>
        <div className="mt-2 mb-3">
          <div className="flex space-x-4">
            <div className="w-1/2" >
              <p className="text-[#2D2D2D]">¿Cuál es el precio?</p>
              <TextInput type={"number"} className={'w-full'} placeholder={"Ingrese el precio"}/>
              {/* <x-input-error :messages="$errors->get('stepTwoForm.price')" className="mt-2" /> */}
            </div>

            <div className="w-1/2">
              <p className="text-[#2D2D2D]">Periodicidad</p>
              <select defaultValue={""} className="w-full border-gray-300 focus:border-[#FF5C00] focus:ring-[#FF5C00] rounded-md shadow-sm text-[#4F4F4F]"> {/**wire:model='stepTwoForm.paymentFrequencyId' */}
                <option value="" className="" disabled>Seleccione la periodicidad</option>
                {
                  paymentFrequencies.map((paymentFrequency) =>
                    <option key={paymentFrequency.id} value={paymentFrequency.id}>
                      {paymentFrequency.frequency}
                    </option>
                  )
                }
              </select>
              {/* <x-input-error :messages="$errors->get('stepTwoForm.paymentFrequencyId')" className="mt-2" /> */}
            </div>
          </div>
        </div>
        <div className="relative">
          <p className="text-[#2D2D2D]">Permite que los interesados puedan contactarte</p>
          <div className="flex items-center">
            <TextInput
              type={"number"}
              className={'w-full'}
              placeholder={"Ingresa uno o más números de teléfono"}
              onClick={(()=>{setOpen(!open);})}
            />
            {/* <x-text-input type="number" className="w-full" placeholder="Ingresa uno o más números de teléfono"
                x-on:click="open=!open"
                x-model="numberInput"
            /> */}
            <SecondaryButton className={"mx-2 border-2"} type="button" onClick={() => addContactNumber()}>
              Agregar
            </SecondaryButton>
          </div>
          {/* <x-input-error :messages="$errors->get('stepTwoForm.selectedContactNumbers')" className="mt-2" /> */}
          {/* <x-input-error :messages="$errors->first('stepTwoForm.selectedContactNumbers.*')" className="mt-2" /> */}
          <div
            ref={divNumbersRef}
            className={`absolute w-full bg-[#ffffff] rounded-lg mt-0.5 ${open ? 'visible' : 'hidden'}`}
          >
            {
              userNumbers.map(contactNumber => (
                <p
                  key={contactNumber.id}
                  className="block px-2 py-1 border-2 cursor-pointer rounded-md shadow-sm text-[#4F4F4F] hover:bg-[#d4d4d4]"
                  onClick={() => selectContactNumber(contactNumber.contact_number)}
                >
                  {contactNumber.contact_number}
                </p>
              ))
            }
          </div>
          <div className="flex flex-wrap space-x-4 space-y-1 mt-2">
            {
              selectedContactNumbers.map(contactNumber => (
                <div
                  key={contactNumber} 
                  className="bg-white rounded-lg border-2 border-[#FF5C00] px-2 py-1 text-sm flex items-center"
                >
                  <span>{contactNumber}</span>
                  <button
                    type="button"
                    className="ml-2 text-gray-700"
                    onClick={() => {removeContactNumber(contactNumber)}}>x</button>
                </div>
              ))
            }
          </div>
        </div>
        <PrimaryButton className="mt-5" type="submit">
          Continuar
        </PrimaryButton>
      </form>
    </div>
  )
}
