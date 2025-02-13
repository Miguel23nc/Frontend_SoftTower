import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    empresa: false,
    desde: false,
    hasta: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      empresa: formData.empresa === "",
      desde: formData.desde === "",
      hasta: formData.hasta === "",
    };

    setError(newError);

    // Verifica si el formulario es válido
    return Object.values(newError).every((field) => field === false);

    // return formIsValid;
  };

  return { error, validateForm };
};

export default useValidation;
