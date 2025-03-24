import { useState } from "react";
import Register from "../../../../components/Principal/Register/Register";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import PopUp from "../../../../recicle/popUps";
import ButtonOk from "../../../../recicle/Buttons/Buttons";

const RegisterCertificado = () => {
  const [certificado, setCertificado] = useState({});
  console.log("certificado", certificado);
  const enviar = async () => {
    console.log("enviar");
  };

  return (
    <div className="flex flex-col w-full p-6">
      <PopUp />
      <CardPlegable title="Certificado">
        <div className="min-w-[15%] w-[30%]  max-w-[80%]">
          <InpuFiles
            label="Archivo"
            type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            name="certificado"
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
