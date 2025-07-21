import { useEffect, useState } from "react";
import Input from "../../../../recicle/Inputs/Inputs";
import InputTime from "../../../../recicle/Inputs/tipos/InputTime";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";

const DatosGenerales = ({ form, setForm, error }) => {
  console.log("fecha:", form.datosGenerales);

  const [datosGenerales, setDatosGenerales] = useState({
    fecha: form.datosGenerales?.fecha || "",
    horaIngreso: form.datosGenerales?.horaIngreso || "",
    recepcionadoPor: form.datosGenerales?.recepcionadoPor || "",
    dniRecepcionadoPor: form.datosGenerales?.dniRecepcionadoPor || "",
    responsableEntrega: form.datosGenerales?.responsableEntrega || "",
    registroOCIP: form.datosGenerales?.registroOCIP || "",
    estadoActa: form.datosGenerales?.estadoActa || "",
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setForm((prevForm) => ({
        ...prevForm,
        datosGenerales: {
          ...prevForm.datosGenerales,
          ...datosGenerales,
        },
      }));
    }, 50); // pequeño retraso para evitar múltiples renders rápidos

    return () => clearTimeout(timeout);
  }, [datosGenerales]);

  return (
    <form className="w-full flex flex-wrap" autoComplete="off">
      <InputDate
        label="Fecha De Ingreso"
        name="fecha"
        value={datosGenerales.fecha}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.fecha}
      />
      <InputTime
        label="Hora de Ingreso"
        name="horaIngreso"
        value={datosGenerales.horaIngreso}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.horaIngreso}
      />
      <Input
        label="Recepcionado Por"
        name="recepcionadoPor"
        value={datosGenerales.recepcionadoPor}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.recepcionadoPor}
      />
      <Input
        label="DNI Recepcionado Por"
        name="dniRecepcionadoPor"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={datosGenerales.dniRecepcionadoPor}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.dniRecepcionadoPor}
      />
      <Input
        label="Responsable Entrega"
        name="responsableEntrega"
        value={datosGenerales.responsableEntrega}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.responsableEntrega}
      />

      <Input
        label="Registro o CIP"
        name="registroOCIP"
        value={datosGenerales.registroOCIP}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.registroOCIP}
      />
      <Input
        label="Estado de Acta"
        name="estadoActa"
        value={datosGenerales.estadoActa}
        setForm={setDatosGenerales}
        errorOnclick={error.datosGenerales?.estadoActa}
      />
    </form>
  );
};

export default DatosGenerales;
