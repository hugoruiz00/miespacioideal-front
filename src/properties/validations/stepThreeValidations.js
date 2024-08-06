
export const validateListImages = (images) => {
  if(!images) return 'Agrega al menos una fotografía';

  if(images.length == 0) return 'Agrega al menos una fotografía';

  if(images.length > 10) return 'Puedes agregar como máximo 5 fotografías';

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