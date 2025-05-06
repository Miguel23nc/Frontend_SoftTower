import { useState } from "react";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import PopUp from "../../../../recicle/popUps";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../../recicle/senMessage";
import { useAuth } from "../../../../context/AuthContext";
import useValidation from "../validateModulo";

const Register = () => {
  const { postModule, postSubModule } = useAuth();
  const [form, setForm] = useState({
    module: "",
    name: "",
  });
  const { error, validateForm } = useValidation(form);
  const sendMessage = useSendMessage();
  const enviar = async () => {
    try {
      if (!validateForm(form)) {
        sendMessage("Por favor completa todos los campos", "Error");
        return;
      }
      if (form.module && !form.name) {
        await postModule({ name: form.module });
        return;
      }

      if (form.module && form.name) {
        await postSubModule(form);
        return;
      }
    } catch (error) {
      sendMessage(error.message, "Error");
    }
  };
  return (
    <div className="flex flex-col w-full p-6">
      <PopUp />
      <CardPlegable title="Datos Generales">
        <div className="flex">
          <Input
            label="Modulo"
            value={form.module}
            setForm={setForm}
            name="module"
            ancho="w-80"
            errorOnclick={error.module}
          />
          <InputNormal
            label="SubModulo"
            value={form.name}
            setForm={setForm}
            name="name"
            ancho="w-80"
          />
        </div>
      </CardPlegable>
      <div className="flex justify-center">
        <ButtonOk
          children="Registrar"
          onClick={enviar}
          classe="w-40 m-8"
          type="ok"
        />
      </div>
    </div>
  );
};

export default Register;
