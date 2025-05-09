import { useEffect, useState } from "react";
import Register from "../../../../../components/Principal/Register/Register";
import CardPlegable from "../../../../../recicle/Divs/CardPlegable";
import DatosDeAsistencia from "./Asistencia";
import DatoDeColaborador from "./Colaborador";
import useValidation from "../validateAsistenciaColaborador";
import { useAuth } from "../../../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../../../redux/actions";
import useSendMessage from "../../../../../recicle/senMessage";

const RegisterAsistenciaColaborador = () => {
  const { createAsistenciaColaborador } = useAuth();
  const [form, setForm] = useState({
    colaborador: "",
    fecha: "",
    ingreso: "",
    salida: "",
    inicioAlmuerzo: "",
    finAlmuerzo: "",
  });
  const sendMessage = useSendMessage();
  const colaboradores = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    if (colaboradores.length === 0) dispatch(getEmployees());
  }, [colaboradores]);
  const { error, validateForm } = useValidation();

  const register = async () => {
    sendMessage("Registrando Asistencia", "Espere");
    try {
      const colaboradorId = await colaboradores.find(
        (colaborador) =>
          colaborador.lastname + " " + colaborador.name === form.colaborador
      );
      if (!colaboradorId)
        return sendMessage("Colaborador no encontrado", "error");
      const newForm = {
        ...form,
        colaborador: colaboradorId._id,
      };
      delete newForm.tipoDeColaborador; 
      await createAsistenciaColaborador(newForm);
    } catch (error) {
      sendMessage(error.message, "Error");
    }
  };

  return (
    <Register registrar={register} validate={() => validateForm(form)}>
      <CardPlegable title="Datos de Asistencia">
        <DatosDeAsistencia setForm={setForm} error={error} form={form} />
      </CardPlegable>
      <CardPlegable title="Datos del Colaborador">
        <DatoDeColaborador setForm={setForm} error={error} form={form} />
      </CardPlegable>
    </Register>
  );
};

export default RegisterAsistenciaColaborador;
