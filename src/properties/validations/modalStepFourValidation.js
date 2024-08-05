import yup from './messageValidations';

export const modalStepFourValidations = yup.object({
  description: yup.string().max(5000),
  value: yup.mixed().when('$datatype', ([datatype], schema) => {
    switch (datatype) {
      case 'string':
        return yup.string().required().max(100);
      case 'integer':
        return yup.number().required().positive().integer();
      case 'numeric':
        return yup.number().required().positive();
      default:
        return schema;
    }
  })
});