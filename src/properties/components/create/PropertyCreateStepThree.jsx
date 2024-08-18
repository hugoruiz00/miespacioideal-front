import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../../../components/PrimaryButton"
import { FaTimesCircle } from "react-icons/fa";
import { validateImage, validateListImages } from "../../validations/stepThreeValidations";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createOwnerProperty } from "../../../store/properties/propertiesThunks";
import { BackendErrorMessage } from "../../../components/BackendErrorMessage";
import { clearError } from "../../../store/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import { API_URL } from "../../../constants/constants";
import { SecondaryButton } from "../../../components/SecondaryButton";

export const PropertyCreateStepThree = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [errorImages, setErrorImages] = useState(null);
  const {currentProperty, loading, error} = useSelector(state => state.properties);

  useEffect(() => {
    if (currentProperty) {
      setExistingImages(currentProperty.images || []);
    }
  }, [currentProperty]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const imagesValidation = validateListImages(selectedImages, existingImages);
    if(imagesValidation !== 'valid') {
      setErrorImages(imagesValidation);
      return;
    }
    setErrorImages(null);

    const formData = new FormData();
    selectedImages.forEach(image => {
      formData.append('images[]', image);
    });

    existingImages.forEach(image => {
      formData.append('existing_images[]', image.id);
    });

    const property = await dispatch(createOwnerProperty(formData, 'step-three'));
    if(property.id){
      navigate(`/property/step-four/${property.id}`);
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      const imgValidation = validateImage(files[i]);
      if(imgValidation !== 'valid') {
        setErrorImages(imgValidation);
        return;
      }
    }
    setErrorImages(null);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  }

  const handleDeleteImage = (event, index, exists = false) => {
    event.stopPropagation();
    if (exists) {
      setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
    fileInputRef.current.value = null;
  }

  return (
    <div>
      <h1 className="text-2xl mb-5">Fotografías de la propiedad</h1>
      <p className="text-lg text-[#4F4F4F] mb-2">Permite a las personas conocer e interesarse por tu propiedad
        compartiendo algunas fotografías</p>
      <form onSubmit={onSubmit}>
        <div
          onClick={ () => fileInputRef.current.click() }
          className={`py-6 w-full min-h-36 rounded border-dashed border-2 flex flex-wrap gap-2 justify-center items-center cursor-pointer
            ${selectedImages.length > 0 || existingImages.length > 0 ? 'bg-[#cff0dc] border-green-600' : 'bg-[#e0e0e0] border-gray-600'}`}>
          <input
            ref={ fileInputRef }
            id="images" name="images" type="file" accept="image/*" multiple className="hidden"
            onChange={handleImageChange}
          />
          {selectedImages.length == 0 && existingImages.length === 0 &&
            <span className="text-slate-600 mx-5 absolute">
              Haz click para agregar fotografías de tu propiedad
            </span>
          }
          {existingImages.map((image, index) => (
            <div key={index} className="cursor-default relative">
              <img
                src={`${API_URL}${image.image_url}`}
                alt={`preview ${index}`}
                className="w-20 h-20"
                onClick={(event) => event.stopPropagation()}
              />
              <FaTimesCircle className="absolute top-1 right-1 cursor-pointer" onClick={(event) => handleDeleteImage(event, index, true)} />
            </div>
          ))}
          {selectedImages.map((image, index) => (
            <div key={index} className="cursor-default relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview ${index}`}
                className="w-20 h-20"
                onClick={(event) => event.stopPropagation()}
              />
              <FaTimesCircle className="absolute top-1 right-1 cursor-pointer" onClick={(event) => handleDeleteImage(event, index)} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-5">
          <SecondaryButton type="button" className={'mr-5'} disabled={loading}
            onClick={() => navigate(`/property/step-two/${currentProperty.id}`)}>
            Anterior
            { loading && <Loading className={'h-4 w-4 ml-2'}/> }
          </SecondaryButton>

          <PrimaryButton type="submit" disabled={loading}>
            Continuar
            { loading && <Loading className={'h-4 w-4 ml-2'}/> }
          </PrimaryButton>
        </div>
      </form>
      <div>
        {errorImages && <ErrorMessage message={errorImages} className={'mt-1'}/>}
        {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}
      </div>
    </div>
  )
}
