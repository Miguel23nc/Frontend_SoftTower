import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    fecha: false,
    ingreso: false,
    salida: false,
    inicioAlmuerzo: false,
    finAlmuerzo: false,
    colaborador: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      fecha: formData.fecha === "",
      ingreso: formData.ingreso === "",
      salida: formData.salida === "",
      inicioAlmuerzo: formData.inicioAlmuerzo === "",
      finAlmuerzo: formData.finAlmuerzo === "",
      colaborador: formData.colaborador === "",
    };

    setError(newError);

    // Verifica si el formulario es válido
    return Object.values(newError).every((field) => field === false);

    // return formIsValid;
  };

  return { error, validateForm };
};

export default useValidation;
