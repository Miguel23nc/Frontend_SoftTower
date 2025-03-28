import { useState } from "react";
import Register from "../../../../components/Principal/Register/Register";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import PopUp from "../../../../recicle/popUps";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import { useAuth } from "../../../../context/AuthContext";
import useSendMessage from "../../../../recicle/senMessage";
import Input from "../../../../recicle/Inputs/Inputs";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";
import dayjs from "dayjs";
import documentoCloudinary from "../../../../api/cloudinaryDocument";

const RegisterCertificado = () => {
  const day = dayjs().format("DD/MM/YYYY");

  const [certificado, setCertificado] = useState({
    name: "",
    fecha: day || "",
    archivo: "",
  });
  const [deshabilitar, setDeshabilitar] = useState(false);
  const sendMessage = useSendMessage();
  const { enviarCertificados } = useAuth();
  const enviar = async () => {
    setDeshabilitar(true);
    sendMessage("Cargando...", "Espere");
    try {
      if (!certificado.archivo) {
        sendMessage("Debe subir un Documento", "Error");
        return;
      }
      const pathDocument = await documentoCloudinary(certificado.archivo);
      if (!pathDocument.secure_url) {
        sendMessage("Error al subir el Documento", "Error");
        return;
      }
      await enviarCertificados({
        ...certificado,
        archivo: pathDocument.secure_url,
      });
    } catch (error) {
      console.log(error);
      sendMessage(error.message, "Error");
    } finally {
      setDeshabilitar(false);
      sendMessage("", "");
    }
  };
  console.log("certificado", certificado);

  return (
    <div className="flex flex-col w-full p-6">
      <PopUp deshabilitar={deshabilitar} />
      <CardPlegable title="Certificado">
        <div className="min-w-[15%] flex w-[30%]  max-w-[80%]">
          <Input
            label="Nombre"
            name="name"
            value={certificado.name}
            setForm={setCertificado}
          />
          <InputDate
            label="Fecha"
            name="fecha"
            value={day}
            setForm={setCertificado}
          />
          <InpuFiles
            label="Archivo"
            type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            name="archivo"
            setForm={setCertificado}
          />
        </div>
      </CardPlegable>
      <div className="flex justify-center">
        <ButtonOk children="Enviar" onClick={enviar} type="ok" />
      </div>
    </div>
  );
};

export default RegisterCertificado;
