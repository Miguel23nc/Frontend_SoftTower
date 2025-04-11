import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    name: false,
    key: false,
    imagen: false,
    grupo: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      name: formData.name === "",
      key: formData.key === "",
      imagen: !formData.imagen,
      grupo: formData.grupo === "",
    };

    setError(newError);

    const formIsValid = Object.values(newError).every(
      (field) =>
        field === false ||
        (typeof field === "object" &&
          Object.values(field).every((subfield) => subfield === false))
    );

    return formIsValid;
  };

  return { error, validateForm };
};

export default useValidation;
