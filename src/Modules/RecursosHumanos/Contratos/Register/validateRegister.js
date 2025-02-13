// src/utils/validation.js
import { useState } from "react";

const useValidation = (initialFormData) => {
  const [error, setError] = useState({
    typeContract: false,
    dateStart: false,
    dateEnd: false,
    empresa: {
      ruc: false,
      razonSocial: false,
      representative: false,
      representativeDocumentType: false,
      representativeDocumentNumber: false,
      domicilioFiscal: false,
    },
    colaborator: {
      name: false,
      charge: false,
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
      empresa: {
        ruc: formData.empresa.ruc === "",
        razonSocial: formData.empresa.razonSocial === "",
        representative: formData.empresa.representative === "",
        representativeDocumentType:
          formData.empresa.representativeDocumentType === "",
        representativeDocumentNumber:
          formData.empresa.representativeDocumentNumber === "",
        domicilioFiscal: formData.empresa.domicilioFiscal === "",
      },
      colaborator: {
        name: formData.colaborator.name === "",
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
