import yup from './messageValidations';

export const stepTwoValidations = yup.object({
  description: yup.string().max(5000).required(),
  price: yup.number().required().positive().max(99999999.99),
  paymentFrequencyId: yup.number().when('$isRent', ([isRent], schema) => isRent ? schema.required() : schema),
  numbers: yup.array().min(1).of(yup.number().transform((value, originalValue) => parseFloat(originalValue.value)).required()).required()
});