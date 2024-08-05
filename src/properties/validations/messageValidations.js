import * as yup from "yup"

yup.setLocale({
  mixed: {
    default: 'No es válido',
    required: 'Este campo es obligatorio',
    notType: (_ref) => {
      switch (_ref.type) {
        // Se comenta este campo porque cuando se valida un select con ids, muestra el mensaje
        // pero no es correcto porque a ojos del usuario es un campo de texto que selcciona
        // case 'number':
        //   return 'No es un número válido';
        case 'string':
          return 'No es un texto válido';
        default:
          return 'Este campo no es válido';
      }
    },
  },
  number: {
    positive: 'El número debe ser mayor a 0',
    integer: 'El número debe ser entero',
    min: 'Debe tener como mínimo el valor ${min}',
    max: 'Debe tener como máximo el valor ${max}',
  },
  string: {
    min: 'Debe tener como mínimo ${min} caracteres',
    max: 'Debe tener como máximo ${max} caracteres',
  },
  array: {
    min: 'Agrega al menos ${min} elemento(s)',
    max: 'No puede haber más de ${max} elementos',
  },
});

export default yup;