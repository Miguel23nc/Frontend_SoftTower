import { useState } from "react";
import ReportAlmacen from "../../Almacen/Report/Report";

const Movimientos = ({ contratos }) => {
   const [form, setForm] = useState({
    contrato:"",
    desde: "",
    hasta: "",
  });
  const enviar = (e) => {
    console.log("Formulario enviado:", form);
  };
  return (
    <ReportAlmacen
      form={form}
      setForm={setForm}
      descargar={enviar}
      title="Reporte de Movimientos (EXCEL)"
      options={contratos}
    />
  );
};

export default Movimientos;
