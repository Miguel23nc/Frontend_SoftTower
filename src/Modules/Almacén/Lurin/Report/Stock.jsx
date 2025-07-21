import { useState } from "react";
import ReportAlmacen from "../../Almacen/Report/Report";

const Stock = ({ contratos }) => {
  const [form, setForm] = useState({
    empresa: "",
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
      title="Reporte de Stock (EXCEL)"
      options={contratos}
    />
  );
};

export default Stock;
