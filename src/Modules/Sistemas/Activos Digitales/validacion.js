import { useState } from "react";

const useValidation = () => {
  const [error, setError] = useState({
    name: false,
    tipo: false,
    clave: false,
    cantidad_dispositivos: false,
    fecha_inicio: false,
    fecha_vencimiento: false,
    renovacion_automatica: false,
    costo: false,
    moneda: "PEN",
    proveedor: false,
    state: "ACTIVO",
  });

  // Función de validación
  const validateForm = (formData) => {
    const newError = {
      name: formData.name === "",
      tipo: formData.tipo === "",
      clave: formData.clave === "",
      cantidad_dispositivos: formData.cantidad_dispositivos <= 0,
      fecha_inicio: formData.fecha_inicio === "",
      fecha_vencimiento: formData.fecha_vencimiento === "",
      renovacion_automatica: formData.renovacion_automatica === false,
      costo: formData.costo <= 0,
      moneda: formData.moneda === "PEN",
      proveedor: formData.proveedor === "",
      state: formData.state === "ACTIVO",
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
