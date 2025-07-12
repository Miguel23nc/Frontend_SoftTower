import { useState } from "react";

const useValidation = (initialFormData) => {
  const [error, setError] = useState({
    name: false,
    lastname: false,

  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      name: formData.name === "",
      lastname: formData.lastname === "",

    };

    setError(newError);

    // Verifica si el formulario es válido
    const formIsValid = Object.values(newError).every(
      (field) =>
        field === false ||
        Object.values(field).every((subfield) => subfield === false)
    );

    return formIsValid;
  };

  return { error, validateForm };
};

export default useValidation;
