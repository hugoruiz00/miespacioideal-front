import * as yup from "yup"

export const stepOneValidations = yup.object({
  propertyTypeId: yup.number().required(),
  serviceTypes: yup.array().min(1).required(),
  address: yup.string().max(255).required(),
});