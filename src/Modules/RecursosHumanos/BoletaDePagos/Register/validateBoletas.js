// src/utils/validation.js
import { useState } from "react";

const useValidation = (initialFormData) => {
  const [error, setError] = useState({
    fechaBoletaDePago: false,
    colaborador: false,
    envio: false,
    recepcion: false,
    diasTrabajados: false,
    diasSubsidiados: false,
    horasTrabajadas: false,
    diasNoLaborales: false,
    remuneraciones: {
      datosContables: false,
      monto: false,
    },
    descuentosAlTrabajador: false,
    aportacionesDelEmpleador: false,
  });

  const validateForm = (formData) => {
    const newError = {
      fechaBoletaDePago: formData.fechaBoletaDePago === "",
      colaborador: formData.colaborador === "",
      envio: formData.envio === "",
      recepcion: formData.recepcion === "",
      diasTrabajados: formData.diasTrabajados === "",
      diasSubsidiados: formData.diasSubsidiados === "",
      horasTrabajadas: formData.horasTrabajadas === "",
      diasNoLaborales: formData.diasNoLaborales === "",
      remuneraciones: formData.remuneraciones === "",
      descuentosAlTrabajador: formData.descuentosAlTrabajador.some(
        (descuento) => descuento.monto === 0
      ),
      aportacionesDelEmpleador: formData.aportacionesDelEmpleador.some(
        (aporte) => aporte.monto === 0
      ),
    };

    // Validar si los campos dentro de los arreglos son vacíos o no
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
