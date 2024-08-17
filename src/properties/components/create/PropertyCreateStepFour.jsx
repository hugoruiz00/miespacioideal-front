import { FaSearch } from "react-icons/fa"
import {detailIcons} from '../../components/IconsPropertyDetail';
import { PrimaryButton } from "../../../components/PrimaryButton";
import { PiPencilSimple, PiPlusCircle, PiXCircle } from "react-icons/pi";
import { Modal } from "../../../components/Modal";
import { useEffect, useState } from "react";
import { TextArea } from "../../../components/TextArea";
import { TextInput } from "../../../components/TextInput";
import { useFieldArray, useForm } from "react-hook-form";
import { modalStepFourValidations } from "../../validations/modalStepFourValidation";
import { useDispatch, useSelector } from "react-redux";
import { createOwnerProperty } from "../../../store/properties/propertiesThunks";
import { getDetails } from "../../../store/properties/propertyMetadataThunks";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { BackendErrorMessage } from "../../../components/BackendErrorMessage";
import { clearError } from "../../../store/properties/propertiesSlice";
import { Loading } from "../../../components/Loading";
import { SecondaryButton } from "../../../components/SecondaryButton";
import { useNavigate } from "react-router-dom";

const modalSchema = modalStepFourValidations;

export const PropertyCreateStepFour = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [searchText, setSearchText] = useState('');

  const {details=[]} = useSelector(state => state.propertyMetadata);
  const {currentProperty, loading, error} = useSelector(state => state.properties);

  const { handleSubmit, control, reset } = useForm();
  const { fields, append, update, remove } = useFieldArray({control, name: "details"});

  const filteredDetails = details.filter(detail =>{
    return detail.name.toLowerCase().includes(searchText.toLowerCase()) &&
    !fields.some(selectedDetail => selectedDetail.detailId == detail.id)}
  );

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  useEffect(() => {
    if (currentProperty) {      
      reset({
        details: currentProperty.details.map(detail => ({
          value: detail.pivot.value,
          description: detail.pivot.description, 
          detail: detail.detail,
          icon: detail.icon,
          datatype: detail.datatype,
          detailId: detail.id
        })),
      });
    }
  }, [currentProperty, reset]);

  const onSubmit = async (data) => {
    data.details.forEach(detail => {
      data[detail.detailId] = {
       value: detail.value,
       description: detail.description 
      }
    });
    delete data.details;

    const property = await dispatch(createOwnerProperty(data, 'step-four'));
    console.log(property);
    // if(property.id){
    // TODO 
    // Navegar al show property
    //   navigate(`/property/step-three/${property.id}`);
    // }
  }

  const {register: registerModal, handleSubmit: handleSubmitModal, reset: resetModal, setValue, 
    formState: { errors: errorsModal, isSubmitSuccessful }} = useForm(
      {resolver: yupResolver(modalSchema), context: {datatype: detail?.datatype}}
    );

  const onSubmitModal = (data) => {
    if(detail.datatype == 'boolean'){
      data.value = true;
    }
    const detailContent = {...data, detail: detail.detail, icon: detail.icon, datatype: detail.datatype};

    if(detail.editIndex != undefined){
      update(detail.editIndex, {...detailContent, detailId: detail.detailId}) 
    }else{
      append({...detailContent, detailId: detail.id});
    }
    setOpen(false);
    setDetail(null);
  }

  const onEdit = (field, index) => {
    field.editIndex = index;
    setOpen(true);
    setDetail(field);
    setValue('value', field.value);
    setValue('description', field.description);
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      resetModal();
    }
  }, [isSubmitSuccessful, resetModal])


  return (
    <div>
      <h1 className="text-2xl mb-2">Detalles de la propiedad (opcional)</h1>
      <p className="text-lg text-[#4F4F4F] mb-5">Agrega otros detalles para que las personas encuentren
        tu propiedad con mayor facilidad</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <p className="mb-1 text-[#2D2D2D]">Selecciona los detalles</p>
          <label htmlFor="voice-search" className="sr-only">Buscar</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FaSearch className='text-gray-400 h-5 w-5' />
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF5C00] focus:border-[#FF5C00] block w-full pl-10 p-2"
              placeholder="Filtrar detalles..."/>
          </div>

          {filteredDetails.length == 0 &&
            <p className="text-base text-[#4F4F4F] mt-3 flex">
              No se ha encontrado coincidencias, pruebe con otra búsqueda
            </p>
          }
          <div className="my-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-scroll">
            {
              filteredDetails.map(detail => {
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
                    >
                      <PiPlusCircle
                        onClick={() => {
                          resetModal();
                          setOpen(true);
                          setDetail(detail);
                        }}
                        className='text-[#3F3F3F] h-6 w-6'/>
                    </span>
                  </div>
                )
              })
            }            
          </div>

          <p className="text-lg">Detalles agregados</p>
          {fields.length == 0 &&
            <p className="text-base text-[#4F4F4F] mt-3 flex">
              No tienes detalles agregados, comienza agregando uno con el ícono de <PiPlusCircle className='text-[#3F3F3F] h-6 w-6 ml-1'/>
            </p>
          }
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {fields.map((field, index) => {
              const Icon = detailIcons[field.icon];
              return (
                <div className="flex justify-between items-center bg-white shadow-md rounded-sm p-2 mb-2" key={field.id}>
                  <div className="flex">
                    <span title={field.detail}>
                      <Icon className='text-[#4F4F4F] h-5 w-5'/>
                    </span>
                    <p className="text-[#4F4F4F] font-medium ml-4">{field.detail}
                      {field.datatype != 'boolean' && field.datatype != 'string' && <span>: {field.value}</span>}
                      {field.datatype == 'string' && <span>: {`${field.value.substring(0, 10)}...`}</span>}
                    </p>
                  </div>
                  <div className="flex space-x-6 items-center">
                    {/* <span className="cursor-pointer" title="Comentarios">
                      <PiChatText className='h-6 w-6'/>
                    </span> */}
                    <span className="cursor-pointer" title="Editar" onClick={() => onEdit(field, index)}>
                      <PiPencilSimple className='h-6 w-6'/>
                    </span>
                    <span className="cursor-pointer" title="Quitar" onClick={() => {remove(index)}}>
                      <PiXCircle className='text-[#B92727] h-6 w-6'/>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <SecondaryButton type="button" className={'mr-5'} disabled={loading}
            onClick={() => navigate(`/property/step-three/${currentProperty.id}`)}>
            Anterior
            { loading && <Loading className={'h-4 w-4 ml-2'}/> }
          </SecondaryButton>

          <PrimaryButton type="submit" disabled={loading}>
            Publicar propiedad
            { loading && <Loading className={'h-4 w-4 ml-2'}/> }
          </PrimaryButton>
        </div>        
      </form>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmitModal(onSubmitModal)}>
          <div className="px-5 py-8 text-center">
            <p className="text-lg mb-4">{detail?.detail}</p>
            { detail?.datatype != "boolean" &&
              <TextInput className="w-full mb-3" register={registerModal} name={"value"} placeholder="Ingrese una cantidad" />
            }
            {(errorsModal.value && detail?.datatype != "boolean") &&
              <ErrorMessage message={errorsModal.value?.message} className={'mt-2'}/>
            }

            <span className="text-sm">Escribe un comentario sobre esta característica (opcional)</span>
            <TextArea className="w-full mb-3" register={registerModal} name={"description"} placeholder={`Ej. `}></TextArea>
            {errorsModal.description && <ErrorMessage message={errorsModal.description?.message} className={'mt-2'}/>}
        
            <PrimaryButton type="submit">
              {detail?.editIndex != undefined ? 'Actualizar' : 'Agregar'}
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}

    </div>
  )
}
