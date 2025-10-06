import { useEffect, useState } from "react";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import useSendMessage from "../../../../recicle/senMessage";
import PopUp from "../../../../recicle/popUps";
import { useAuth } from "../../../../context/AuthContext";
import useValidation from "../validacion";
import { useDispatch, useSelector } from "react-redux";
import RegisterInventario from "./RegisterInventario";
import { getEmployees } from "../../../../redux/modules/Recursos Humanos/actions";

const RegisterInventarioSistemas = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    categoria: "",
    marca: "",
    modelo: "",
    especificaciones: "",
    area: "",
    fecha: "",
    sede: "",
    cantidad: "",
    state: "ACTIVO",
    observacion: "",
  });

  const colaboradores = useSelector(
    (state) => state.recursosHumanos.allEmployees
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchColaboradores = async () => {
      if (colaboradores?.length === 0) {
        await dispatch(getEmployees());
      } else {
        return;
      }
    };
    fetchColaboradores();
  }, [dispatch]);

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
      console.log("...formData", formData);
      
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
