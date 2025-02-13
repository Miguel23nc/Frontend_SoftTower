// src/utils/validation.js
import { useState } from "react";

const useValidation = (initialFormData) => {
  const [error, setError] = useState({
    fechaBoletaDePago: false,
    empresa: false,
  });

  const validateForm = (formData) => {
    const newError = {
      fechaBoletaDePago: formData.fechaBoletaDePago === "",
      empresa: formData.empresa === "",
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
