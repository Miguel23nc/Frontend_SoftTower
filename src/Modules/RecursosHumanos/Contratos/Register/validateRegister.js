// src/utils/validation.js
import { useState } from "react";

const useValidation = (initialFormData) => {
  const [error, setError] = useState({
    typeContract: false,
    dateStart: false,
    dateEnd: false,
    colaborador: {
      name: false,
      empresa: false,
      documentType: false,
      documentNumber: false,
      direccion: false,
      email: false,
      charge: false,
      sueldo: false,
    },
  });

  const validateForm = (formData) => {
    const newError = {
      typeContract: formData.typeContract === "",
      dateStart: formData.dateStart === "",
      dateEnd:
        formData.typeContract !==
          "CONTRATO DE TRABAJO POR TIEMPO INDETERMINADO" &&
        formData.dateEnd === "",
      colaborador: {
        name: formData.colaborador.name === "",
        empresa: formData.colaborador.empresa === "",
        documentType: formData.colaborador.documentType === "",
        documentNumber: formData.colaborador.documentNumber === "",
        direccion: formData.colaborador.direccion === "",
        email: formData.colaborador.email === "",
        charge: formData.colaborador.charge === "",
        sueldo: formData.colaborador.sueldo === "",
      },
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
