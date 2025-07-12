import { useState } from "react";
import ReportAlmacen from "../../Almacen/Report/Report";
import Input from "../../../../recicle/Inputs/Inputs";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";

const Salidas = ({ contratos, contratosId }) => {
  const [form, setForm] = useState({
    contrato: "",
    codigoInterno: "",
    numeroDeActa: "",
    fechaSalida: "",
  });
  const enviar = (e) => {
    console.log("Formulario enviado:", form);
  };
  return (
    <ReportAlmacen
      form={form}
      setForm={setForm}
      descargar={enviar}
      title="Reporte de Salida (WORD)"
      options={contratos}
    >
      <Input
        label="Código Interno"
        name="condigoInterno"
        type="select"
        value={form.codigoInterno}
        setError={setForm}
      />
      <Input
        label="Número de Acta"
        name="numeroDeActa"
        type="select"
        value={form.numeroDeActa}
        setError={setForm}
      />
      <InputDate
        label="Fecha de Salida"
        name="fechaSalida"
        value={form.fechaSalida}
        setForm={setForm}
      />
    </ReportAlmacen>
  );
};

export default Salidas;
