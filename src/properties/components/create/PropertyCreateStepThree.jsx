import { useRef, useState } from "react";
import { PrimaryButton } from "../../../components/PrimaryButton"
import { FaTimesCircle } from "react-icons/fa";
import { validateImage, validateListImages } from "../../validations/stepThreeValidations";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createOwnerProperty } from "../../../store/properties/propertiesThunks";
import { BackendErrorMessage } from "../../../components/BackendErrorMessage";
import { clearError } from "../../../store/properties/propertiesSlice";

export const PropertyCreateStepThree = () => {

  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorImages, setErrorImages] = useState(null);
  const {error} = useSelector(state => state.properties);

  const onSubmit = async (e) => {
    e.preventDefault();

    const imagesValidation = validateListImages(selectedImages);
    if(imagesValidation !== 'valid') {
      setErrorImages(imagesValidation);
      return;
    }
    setErrorImages(null);

    const formData = new FormData();
    selectedImages.forEach(image => {
      formData.append('images[]', image);
    });

    const property = await dispatch(createOwnerProperty(formData, 'step-three'));
    // if(property.id){
    //   navigate(`/property/step-four/${property.id}`);
    // }
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

  const handleDeleteImage = (event, index) => {
    event.stopPropagation();
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
          className={`py-6 w-full h-36 rounded border-dashed border-2 flex gap-2 justify-center items-center cursor-pointer
            ${selectedImages.length > 0 ? 'bg-[#cff0dc] border-green-600' : 'bg-[#e0e0e0] border-gray-600'}`}>
          <input
            ref={ fileInputRef }
            id="images" name="images" type="file" accept="image/*" multiple className="hidden"
            onChange={handleImageChange}
          />
          {selectedImages.length == 0 &&
            <span className="text-slate-600 mx-5 absolute">
              Haz click para agregar fotografías de tu propiedad
            </span>
          }
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
        
        <PrimaryButton className="mt-5" type="submit">
          Continuar
        </PrimaryButton>
      </form>
      <div>
        {errorImages && <ErrorMessage message={errorImages} className={'mt-1'}/>}
        {error && <BackendErrorMessage errorMessage={error} handleClose={() => dispatch(clearError())}/>}
      </div>
    </div>
  )
}
