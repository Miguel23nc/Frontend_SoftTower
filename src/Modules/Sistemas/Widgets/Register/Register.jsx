import { useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import DatosWidget from "./Datos";
import useSendMessage from "../../../../recicle/senMessage";
import PopUp from "../../../../recicle/popUps";
import useValidation from "./validateWidgets";
import { useAuth } from "../../../../context/AuthContext";
import imageCloudinary from "../../../../api/cloudinaryImage";

const RegisterWidget = () => {
  const [form, setform] = useState({
    name: "",
    key: "",
    imagen: "",
    description: "",
    grupo: "",
  });
  const sendMessage = useSendMessage();
  const { error, validateForm } = useValidation();
  const { postWidget } = useAuth();
  const [habilitar, setHabilitar] = useState(false);
  const enviar = async () => {
    const validacion = validateForm(form);    
    if (!validacion) {
      sendMessage("Complete todos los campos", "Error");
      return;
    }
    setHabilitar(true);
    sendMessage("Cargando...", "Espere");
    try {
      const pathImage = await imageCloudinary(form.imagen);      
      if (!pathImage) {
        sendMessage("Error al subir la imagen", "Error");
        return;
      }
      await postWidget({ ...form, imagen: pathImage.secure_url });
    } catch (error) {
      sendMessage(error, "Error");
    } finally {
      setHabilitar(false);
    }
  };
  return (
    <div className="w-full flex flex-col px-12">
      <PopUp deshabilitar={habilitar} />
      <DatosWidget setform={setform} form={form} error={error} />
      <div>
        <ButtonOk type="ok" classe="w-40" onClick={() => enviar()}>
          Guardar
        </ButtonOk>
      </div>
    </div>
  );
};

export default RegisterWidget;
