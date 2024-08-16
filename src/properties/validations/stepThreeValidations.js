
export const validateListImages = (images, existingImages) => {
  if(!images) return 'Agrega al menos una fotografía';

  if(images.length == 0 && existingImages.length == 0) return 'Agrega al menos una fotografía';

  const maxImages = 10;
  if((images.length + existingImages.length) > maxImages) {
    return `Puedes agregar como máximo ${maxImages} fotografías`;
  }

  return 'valid';
}

export const validateImage = (image) => {
  const maxImageSize = 10000;
  const validTypes = ['image/jpg', 'image/png', 'image/jpeg'];

  if(!image) return 'Agrega una fotografía válida';
  
  if(!validTypes.includes(image.type)) return 'El tipo del archivo no es válido';

  if(image.size/1000 > maxImageSize) return 'La fotografía es demasiado grande, hasta 10 MB';
  
  return 'valid';
}