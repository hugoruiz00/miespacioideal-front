import { useEffect } from 'react'
import { Checkbox } from '../../../components/Checkbox';
import { TextInput } from '../../../components/TextInput';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyTypes } from '../../../store/properties/propertyMetadataThunks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { stepOneValidations } from '../../validations/stepOneValidations';
import { createProperty } from '../../../store/properties/propertiesThunks';
import { clearError, setCurrentStep } from '../../../store/properties/propertiesSlice';
import { BackendErrorMessage } from '../../../components/BackendErrorMessage';
import { useNavigate } from 'react-router-dom';

const schema = stepOneValidations;

export const PropertyCreateStepOne = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {propertyTypes=[]} = useSelector(state => state.propertyMetadata);
  const {error} = useSelector(state => state.properties);

  useEffect(() => {
    dispatch(getPropertyTypes());
  }, [])

  const {register, watch, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema)});
  const watchPropertyType = watch("propertyTypeId", null);
  
  const onSubmit = async (data) => {
    const property = await dispatch(createProperty(data, 'step-one'));
    if(property.id){
      navigate(`/property/step-two/${property.id}`);
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-5">¿Qué deseas publicar?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-[#2D2D2D]">Tipo de propiedad</p>
          <div className="grid grid-cols-2 gap-2 my-4">
            {propertyTypes.map(propertyType => (
              <label
                key={propertyType.id}
                className={`bg-[#FFFFFF] text-[#4F4F4F] w-full h-12 p-2 rounded-md cursor-pointer shadow-md flex items-center
                                    ${watchPropertyType == propertyType.id ? 'border-[#FF5C00] border-2' : ''}`}
              >
                <input
                  type="radio"
                  id={propertyType.id}
                  value={propertyType.id}
                  className="hidden"
                  {...register('propertyTypeId')}
                />
                <p>{propertyType.name}</p>
              </label>
            ))}
          </div>
          {errors.propertyTypeId && <ErrorMessage message={errors.propertyTypeId?.message} className={'mt-2'}/>}
        </div>
        <div className="my-5">
          <p className="text-[#2D2D2D]">¿Qué tipo de anuncio desea realizar?</p>
          <div className="mt-1 mb-4">
            <label className="cursor-pointer mr-5">
              <Checkbox
                register={register}
                name={'serviceTypes'}
                className={'mr-2'}
                value={"1"} />
              <span className="text-[#4F4F4F]">Renta</span>
            </label>
            <label className='cursor-pointer '>
              <Checkbox
                register={register}
                name={'serviceTypes'}
                className={'mr-2'}
                value={"2"} />
              <span className="text-[#4F4F4F]">Venta</span>
            </label>
            {errors.serviceTypes && <ErrorMessage message={errors.serviceTypes?.message} className={'mt-2'}/>}
          </div>
        </div>
        <div>
          <p className="text-[#2D2D2D]">¿Dónde se encuentra tu propiedad?</p>
          <TextInput
            register={register}
            name={'address'}
            className={'w-full'}
            placeholder={"Ingresa una dirección"} />
          {errors.address && <ErrorMessage message={errors.address?.message} className={'mt-2'}/>}
        </div>
        <PrimaryButton className={'mt-5'} type={'submit'}>
          Continuar
        </PrimaryButton>
      </form>
      {/* [#00a762] */}
      {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}
    </>
  )
}
