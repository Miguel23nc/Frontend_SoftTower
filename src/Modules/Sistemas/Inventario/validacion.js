import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    name: false,
    area: false,
    encargado: false,
    fecha: false,
    sede: false,
    cantidad: false,
    state: false,
    descripcion: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      name: formData.name === "",
      area: formData.area === "",
      encargado: formData.encargado === "",
      fecha: formData.fecha === "",
      sede: formData.sede === "",
      cantidad: formData.cantidad <= 0,
      state: formData.state === "",
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
