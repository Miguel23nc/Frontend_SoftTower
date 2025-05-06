import { useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PopUp from "../../../../recicle/popUps";
import RegisterActivos from "./RegisterActivosdigitales";
import useValidation from "../validacion";
import dayjs from "dayjs";
import useSendMessage from "../../../../recicle/senMessage";

const RegisterActivosDigitales = () => {
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tipo: "",
    clave: "",
    cantidad: "",
    fecha_inicio: dayjs().format("DD/MM/YYYY"),
    fecha_vencimiento: "",
    costo: "",
    moneda: "PEN",
    proveedor: "",
    state: "ACTIVO",
  });
  const { error, validateForm } = useValidation();
  const sendMessage = useSendMessage();
  const enviar = async () => {
    setDeshabilitar(true);
    try {
    } catch (error) {
      sendMessage(error.message, "Error");
    } finally {
      setDeshabilitar(false);
    }
  };
  return (
    <div className="px-10 ">
      <PopUp disabled={deshabilitar} />
      <RegisterActivos
        error={error}
        setFormData={setFormData}
        formData={formData}
      />
      <div className="flex justify-center items-center mt-10">
        <ButtonOk type="ok" classe="w-40" onClick={enviar} children="Enviar" />
      </div>
    </div>
  );
};

export default RegisterActivosDigitales;
