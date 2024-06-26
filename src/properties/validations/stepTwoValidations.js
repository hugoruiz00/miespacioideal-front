import * as yup from "yup"

export const stepTwoValidations = yup.object({
  description: yup.string().max(5000).required(),
  price: yup.number().required().positive().max(99999999.99),
  paymentFrequencyId: yup.number().required(),
  numbers: yup.array().min(1).of(yup.number().required()).required()
});