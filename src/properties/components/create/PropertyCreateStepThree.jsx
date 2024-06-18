import { PrimaryButton } from "../../../components/PrimaryButton"

export const PropertyCreateStepThree = () => {
  return (
    <div>
      <h1 className="text-2xl mb-5">Fotografías de la propiedad</h1>
      <p className="text-lg text-[#4F4F4F] mb-2">Permite a las personas conocer e interesarse por tu propiedad
        compartiendo algunas fotografías</p>
      <form action="#" method="post" encType="multipart/form-data"> {/**wire:submit="save" */}            
        <div className="py-6 w-full h-36 rounded border-dashed border-2 flex flex-col justify-center items-center">
        
        </div>
        
        <PrimaryButton className="mt-5" type="submit">
          Continuar
        </PrimaryButton>
      </form>
      <div>
        {/* <x-input-error :messages="$errors->get('stepThreeForm.propertyImages')" className="mt-2" />
        <x-input-error :messages="$errors->first('stepThreeForm.propertyImages.*')" className="mt-2" /> */}
      </div>
    </div>
  )
}
