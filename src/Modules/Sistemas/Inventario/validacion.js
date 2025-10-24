import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    codigo: false,
    categoria: false,
    marca: false,
    modelo: false,
    estado: false,
    descripcion: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      codigo: formData.codigo === "",
      categoria: formData.categoria === "",
      marca: formData.marca === "",
      modelo: formData.modelo === "",
      estado: formData.estado === "",
      descripcion: formData.descripcion === "",
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
