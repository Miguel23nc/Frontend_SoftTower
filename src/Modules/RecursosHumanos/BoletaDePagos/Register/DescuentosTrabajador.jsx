import Input from "../../../../recicle/Inputs/Inputs";
import { useEffect, useState } from "react";
import Comun from "./Comun";

const DescuentosAlTrabajador = ({
  setForm,
  datosContables,
  initialData,
  set,
}) => {
  const [formDescuentosDelTrabajador, setFormDescuentosDelTrabajador] =
    useState({
      codigoPlame: initialData.datosContables || "",
      concepto: "",
      tipo: "",
      monto: initialData.monto || "",
    });
  const findDescuentos = datosContables?.find(
    (a) => a.codigoPlame === formDescuentosDelTrabajador.codigoPlame
  );
  useEffect(() => {
    if (findDescuentos)
      setFormDescuentosDelTrabajador((prev) => ({
        ...prev,
        concepto: findDescuentos?.concepto,
        tipo: findDescuentos?.tipo,
      }));
  }, [findDescuentos]);

  useEffect(() => {
    if (
      formDescuentosDelTrabajador.monto &&
      formDescuentosDelTrabajador.codigoPlame
    ) {
      set({
        datosContables: formDescuentosDelTrabajador.codigoPlame,
        monto: formDescuentosDelTrabajador.monto,
      });
    }
  }, [formDescuentosDelTrabajador]);

  return (
    <Comun
      form={formDescuentosDelTrabajador}
      setForm={setFormDescuentosDelTrabajador}
    />
  );
};

export default DescuentosAlTrabajador;
