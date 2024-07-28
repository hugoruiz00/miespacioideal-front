import { useState, useEffect } from "react"
import { TextArea } from "../../../components/TextArea";
import { TextInput } from "../../../components/TextInput";
import { SecondaryButton } from "../../../components/SecondaryButton";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { useFieldArray, useForm } from "react-hook-form";
import { stepTwoValidations } from "../../validations/stepTwoValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { getContactNumbers, getPaymentFrequencies } from "../../../store/properties/propertyMetadataThunks";
import { createOwnerProperty } from "../../../store/properties/propertiesThunks";
import { BackendErrorMessage } from "../../../components/BackendErrorMessage";
import { clearError } from "../../../store/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";

const schema = stepTwoValidations;

export const PropertyCreateStepTwo = () => {

  const [open, setOpen] = useState(false);
  const [numberInput, setNumberInput] = useState('');
  const [divNumbersRef] = useClickOutside(setOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {paymentFrequencies=[], contactNumbers=[]} = useSelector(state => state.propertyMetadata);
  const {error} = useSelector(state => state.properties);

  useEffect(() => {
    dispatch(getPaymentFrequencies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContactNumbers());
  }, [dispatch]);

  const addContactNumber = () => {
    if(numberInput!=null && numberInput.trim().length == 10){
      const existingNumbers = fields.map(field => field.value);
      if(!existingNumbers.includes(numberInput.trim())){
        append({value:numberInput.trim()});
      }
      setNumberInput('');
      return;
    }
    setError("numbers", {type: "manual", message: "El número debe ser de 10 dígitos"});
  }

  const selectContactNumber = (contactNumber) => {
    setOpen(!open);
    const existingNumbers = fields.map(field => field.value);
    if(!existingNumbers.includes(contactNumber)){
      append({value:contactNumber});
    }
  }

  const getFirstNumberError = () => {
    if (errors.numbers && Array.isArray(errors.numbers)) {
      for (let i = 0; i < errors.numbers.length; i++) {
        if (errors.numbers[i]) return errors.numbers[i]?.message;
      }
    }
    return null;
  }

  const {register, handleSubmit, setError, control, formState: { errors }} = useForm({ resolver: yupResolver(schema)});
  const { fields, append, remove } = useFieldArray({control, name: "numbers"});

  const onSubmit = async (data) => {
    const property = await dispatch(createOwnerProperty(data, 'step-two'));
    if(property.id){
      navigate(`/property/step-three/${property.id}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">Describe tu propiedad</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-[#2D2D2D]">Descripción</p>
          <TextArea
            register={register}
            name={'description'}
            className={'w-full'}
            placeholder={"Escribe sobre tu propiedad"}
          ></TextArea>
          {errors.description && <ErrorMessage message={errors.description?.message} className={'mt-1'}/>}
        </div>
        <div className="mt-2 mb-3">
          <div className="flex space-x-4">
            <div className="w-1/2" >
              <p className="text-[#2D2D2D]">¿Cuál es el precio?</p>
              <TextInput
                register={register}
                name={'price'}
                type={"number"}
                className={'w-full'}
                placeholder={"Ingrese el precio"}/>
              {errors.price && <ErrorMessage message={errors.price?.message} className={'mt-2'}/>}
            </div>

            <div className="w-1/2">
              <p className="text-[#2D2D2D]">Periodicidad</p>
              <select
                {...register("paymentFrequencyId")}
                defaultValue={""}
                className="w-full border-gray-300 focus:border-[#FF5C00] focus:ring-[#FF5C00] rounded-md shadow-sm text-[#4F4F4F]">
                <option value="" className="" disabled>Seleccione la periodicidad</option>
                {
                  paymentFrequencies.map((paymentFrequency) =>
                    <option key={paymentFrequency.id} value={paymentFrequency.id}>
                      {paymentFrequency.frequency}
                    </option>
                  )
                }
              </select>
              {errors.paymentFrequencyId && <ErrorMessage message={errors.paymentFrequencyId?.message} className={'mt-2'}/>}
            </div>
          </div>
        </div>
        <div className="relative">
          <p className="text-[#2D2D2D]">Permite que los interesados puedan contactarte</p>
          <div className="flex items-center">
            <TextInput
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              name={'number'}
              type={"number"}
              className={'w-full'}
              placeholder={"Ingresa uno o más números de teléfono"}
              onClick={(()=>{setOpen(!open)})}
            />
            <SecondaryButton className={"mx-2 border-2"} type="button" onClick={() => addContactNumber()}>
              Agregar
            </SecondaryButton>
          </div>
          {errors.numbers && <ErrorMessage message={errors.numbers?.message} className={'mt-2'}/>}
          {getFirstNumberError() && <ErrorMessage message={getFirstNumberError()} className={'mt-2'}/>}
          
          <div ref={divNumbersRef} className={`absolute w-full bg-[#ffffff] rounded-lg mt-0.5 ${open ? 'visible' : 'hidden'}`}>
            {
              contactNumbers.map(contactNumber => (
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
            {fields.map((field, index) => (
              <div
                key={field.id} 
                className="bg-white rounded-lg border-2 border-[#FF5C00] px-2 py-1 text-sm flex items-center"
              >
                <span>{field.value}</span>
                <button
                  type="button"
                  className="ml-2 text-gray-700"
                  onClick={() => {remove(index)}}>x</button>
              </div>
            ))}
          </div>
        </div>
        <PrimaryButton className="mt-5" type="submit">
          Continuar
        </PrimaryButton>
      </form>
      {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}
    </div>
  )
}
