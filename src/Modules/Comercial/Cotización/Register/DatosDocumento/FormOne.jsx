import { useEffect, useState } from "react";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../stilo.css";
import { dateDocument } from "../../validateCotizacion";
import Input from "../../../../../recicle/Inputs/Inputs";
const FormOne = ({
  setForm1,
  setErrorForm,
  resetForm,
  clients,
  clientSelected,
  form1,
}) => {
  const [fechaOperación, setFechaOperación] = useState(dayjs());
  const oferta = ["7 días", "15 días", "30 días", "45 días", "60 días"];
  const monedas = ["Soles", "Dolares"];
  let validate = dateDocument(form1);

  useEffect(() => {
    if (clientSelected) {
      setForm1((prevData) => ({
        ...prevData,
        ruc: clientSelected.ruc,
        cliente: clientSelected.name,
        direction: clientSelected.direction,
        condition: clientSelected.condition,
      }));
    }
  }, [clientSelected]);
  useEffect(() => {
    if (Object.keys(validate).length > 0) {
      setErrorForm((prevData) => ({
        ...prevData,
        datosDocumentos: true,
      }));
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        datosDocumentos: false,
      }));
    }
  }, [Object.keys(validate).length]);
  const handleOferta = (value) => {
    const numero = parseInt(value.split(" ")[0], 10);
    const fechaOperacion = dayjs(fechaOperación, "DD/MM/YYYY");
    const addition = fechaOperacion.add(numero, "day");
    setForm1((prevData) => ({
      ...prevData,
      fechaVencimiento: addition.format("DD/MM/YYYY"),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oferta") {
      setForm1((prevData) => ({
        ...prevData,
        oferta: value,
      }));
      handleOferta(value);
    } else if (name === "cliente") {
      setForm1((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(),
      }));
    } else {
      setForm1((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  console.log("form1", form1);
  return (
    <form className="flex flex-wrap py-4 items-center w-full">
      <Input
        label="Cliente"
        type="cliente"
        width="w-96 ml-8"
        name="cliente"
        value={form1.cliente || ""}
        onChange={handleChange}
        error={validate.cliente}
      />
      <Input
        label="RUC"
        inputMode="numeric"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        name="ruc"
        value={form1.ruc || ""}
        onChange={handleChange}
        type="text"
        error={validate.ruc}
      />
      <Input
        label="Dirección"
        type="direction"
        name="direction"
        value={form1.direction || ""}
        onChange={handleChange}
        error={validate.direction}
      />
      <Input
        label="Condición de Pago"
        type="condition"
        name="condition"
        value={form1.condition || ""}
        onChange={handleChange}
        error={validate.condition}
      />
      <div className="flex flex-col ml-8 mr-2 h-20 justify-center ">
        <label className="text-base font-medium text-gray-700">
          Fecha de Operación
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={fechaOperación}
              className=" bg-white h-[38px] "
              onChange={(newData) => setFechaOperación(newData)}
              format="DD/MM/YYYY"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Input
        label="Oferta Válida"
        type="select"
        name="oferta"
        options={oferta}
        value={form1.oferta || ""}
        onChange={handleChange}
        error={validate.oferta}
      />
      <Input
        label="Fecha de Vencimiento"
        value={form1.fechaVencimiento || ""}
        disabled
        error={validate.fechaVencimiento}
      />
      <Input
        label="Moneda"
        type="select"
        name="moneda"
        options={monedas}
        value={form1.moneda || ""}
        onChange={handleChange}
        error={validate.moneda}
      />
    </form>
  );
};

export default FormOne;
