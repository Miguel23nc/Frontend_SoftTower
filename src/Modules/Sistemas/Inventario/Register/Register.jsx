import { useEffect, useState } from "react";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../../recicle/senMessage";
import PopUp from "../../../../recicle/popUps";
import { useAuth } from "../../../../context/AuthContext";
import useValidation from "../validacion";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../../redux/actions";
import RegisterInventario from "./RegisterInventario";

const RegisterInventarioSistemas = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    name: "",
    modelo: "",
    especificaciones: "",
    area: "",
    fecha: "",
    sede: "",
    cantidad: "",
    state: "ACTIVO",
    observacion: "",
  });

  const colaboradores = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    if (colaboradores.length === 0) {
      dispatch(getEmployees());
    }
  }, [colaboradores, dispatch]);
  const sendMessage = useSendMessage();
  const [deshabilitar, setDeshabilitar] = useState(false);
  const { postInventarioSistemas } = useAuth();
  const { error, validateForm } = useValidation();

  const enviarInventario = async () => {
    setDeshabilitar(true);
    sendMessage("Cargando...", "Espere");
    const validacion = validateForm(formData);
    try {
      if (!validacion) {
        sendMessage("Complete todos los campos", "Error");
        return;
      }
      const findColaborador = colaboradores.find(
        (colaborador) =>
          colaborador.lastname + " " + colaborador.name === formData.encargado
      );
      await postInventarioSistemas({
        ...formData,
        encargado: findColaborador._id,
      });
    } catch (error) {
      sendMessage(error, "Error");
    } finally {
      setDeshabilitar(false);
    }
  };
  return (
    <div className="px-10 ">
      <PopUp disabled={deshabilitar} />
      <RegisterInventario
        error={error}
        colaboradores={colaboradores}
        setFormData={setFormData}
        formData={formData}
      />
      <div className="flex justify-center items-center mt-10">
        <ButtonOk
          type="ok"
          classe="w-40"
          onClick={enviarInventario}
          children="Enviar"
        />
      </div>
    </div>
  );
};

export default RegisterInventarioSistemas;
