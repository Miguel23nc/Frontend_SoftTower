import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../recicle/Inputs/Inputs";
import { useEffect, useState } from "react";
import { getDatosContables } from "../../../../redux/actions";

const Comun = ({ form, setForm, habilitar }) => {
  const datosContables = useSelector((state) => state.recursosHumanos.datosContables);

  const dispatch = useDispatch();
  useEffect(() => {
    if (datosContables.length === 0) dispatch(getDatosContables());
  }, [datosContables.length, dispatch]);
  const codigosPlame = datosContables.map((a) => a.codigoPlame);

  return (
    <div className="flex flex-wrap">
      <Input
        label="Código Plame"
        name="codigoPlame"
        type="select"
        options={codigosPlame}
        value={form.codigoPlame || ""}
        setForm={setForm}
      />
      <Input
        label="Concepto"
        ancho="w-[500px]"
        name="concepto"
        value={form.concepto}
        setForm={setForm}
      />
      <Input
        label="Tipo"
        ancho="w-[500px]"
        name="tipo"
        value={form.tipo || ""}
        setForm={setForm}
      />

      <Input
        label="Monto"
        onKeyPress={(e) => {
          if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        name="monto"
        value={form.monto}
        setForm={setForm}
      />
    </div>
  );
};

export default Comun;
