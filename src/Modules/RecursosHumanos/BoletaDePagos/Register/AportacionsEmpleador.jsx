import Input from "../../../../recicle/Inputs/Inputs";
import { useEffect, useState } from "react";
import Comun from "./Comun";

const AportacionesDelEmpleador = ({
  setForm,
  datosContables,
  initialData,
  form,
  set,
}) => {
  const [formAportacionesDelEmpleador, setFormAportacionesDelEmpleador] =
    useState({
      codigoPlame: initialData.datosContables || "",
      concepto: "",
      tipo: "",
      monto: initialData.monto || "",
    });
  const findAportacion = datosContables.find(
    (dato) => dato.codigoPlame === formAportacionesDelEmpleador.codigoPlame
  );


  useEffect(() => {
    if (findAportacion)
      setFormAportacionesDelEmpleador((prev) => ({
        ...prev,
        concepto: findAportacion?.concepto,
        tipo: findAportacion?.tipo,
      }));
  }, [findAportacion]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      aportacionesDelEmpleador: [
        ...prevForm.aportacionesDelEmpleador.map((descuento) =>
          descuento.datosContables === formAportacionesDelEmpleador.codigoPlame
            ? {
                datosContables: formAportacionesDelEmpleador.codigoPlame,
                monto: formAportacionesDelEmpleador.monto,
              }
            : descuento
        ),
      ],
    }));
  }, [formAportacionesDelEmpleador]);
  useEffect(() => {
    if (
      formAportacionesDelEmpleador.monto &&
      formAportacionesDelEmpleador.codigoPlame
    ) {
      set({
        datosContables: formAportacionesDelEmpleador.codigoPlame,
        monto: formAportacionesDelEmpleador.monto,
      });
    }
  }, [formAportacionesDelEmpleador]);

  return (
    <Comun
      form={formAportacionesDelEmpleador}
      setForm={setFormAportacionesDelEmpleador}
    />
  );
};

export default AportacionesDelEmpleador;
