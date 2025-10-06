import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    codigo: false,
    categoria: false,
    marca: false,
    area: false,
    fecha: false,
    sede: false,
    encargado: false,
    cantidad: false,
    state: false,
    descripcion: false,
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      codigo: formData.codigo === "",
      categoria: formData.categoria === "",
      marca: formData.marca === "",
      area: formData.area === "",
      fecha: formData.fecha === "",
      sede: formData.sede === "",
      encargado: formData.encargado === "",
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
