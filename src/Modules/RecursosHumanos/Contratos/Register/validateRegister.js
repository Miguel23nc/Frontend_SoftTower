// src/utils/validation.js
import { useState } from "react";

const useValidation = (initialFormData) => {
  const [error, setError] = useState({
    typeContract: false,
    dateStart: false,
    dateEnd: false,
    colaborator: {
      name: false,
      charge: false,
      empresa: false,
      sueldo: false,
      documentType: false,
      documentNumber: false,
      address: false,
      email: false,
    },
    marcaAsistencia: false,
    codigoSPP: false,
    regimenPension: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      typeContract: formData.typeContract === "",
      dateStart: formData.dateStart === "",
      dateEnd: formData.dateEnd === "",
      colaborator: {
        name: formData.colaborator.name === "",
        empresa: formData.colaborator.empresa === "",
        charge: formData.colaborator.charge === "",
        sueldo: formData.colaborator.sueldo === "",
        documentType: formData.colaborator.documentType === "",
        documentNumber: formData.colaborator.documentNumber === "",
        address: formData.colaborator.address === "",
        email: formData.colaborator.email === "",
      },
      marcaAsistencia: formData.marcaAsistencia === "",
      codigoSPP: formData.codigoSPP === "",
      regimenPension: formData.regimenPension === "",
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
