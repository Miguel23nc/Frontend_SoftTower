import { useDispatch } from "react-redux";
import { setMessage } from "../../../redux/actions";
import PopUp from "../../../recicle/popUps";
import ButtonOk from "../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../recicle/senMessage";

const Register = ({ validate, registrar, children }) => {

  const sendMessage = useSendMessage();
  const enviar = async () => {
    sendMessage("Enviando...", "Espere");
    try {
      const validation = validate();

      if (!validation) {
        sendMessage("Faltan datos", "Error");
      } else {
        const response = await registrar();
        if (response) {
          sendMessage("Registro exitoso", "Ok");
        }
      }
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };

  return (
    <div className="flex flex-col w-full p-6">
      <PopUp />
      {children}
      <div className="flex justify-center">
        <ButtonOk children="Enviar" onClick={enviar} type="ok" />
        <ButtonOk children="Cancelar" />
      </div>
    </div>
  );
};

export default Register;
