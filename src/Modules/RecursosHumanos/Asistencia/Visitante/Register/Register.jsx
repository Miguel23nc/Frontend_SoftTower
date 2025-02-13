import { useEffect, useState } from "react";
import Register from "../../../../../components/Principal/Register/Register";
import CardPlegable from "../../../../../recicle/Divs/CardPlegable";
import DatosDeAsistencia from "./Asistencia";
import DatoDeColaborador from "./Colaborador";
import useValidation from "../validateAsistenciaColaborador";
import { useAuth } from "../../../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, setMessage } from "../../../../../redux/actions";

const RegisterAsistenciaVisitante = () => {
  const dispatch = useDispatch();
  const { createAsistenciaVisitante } = useAuth();
  const [form, setForm] = useState({
    fecha: "",
    ingreso: "",
    salida: "",
    inicioAlmuerzo: "",
    finAlmuerzo: "",
    colaborador: "",
  });
  const colaboradores = useSelector((state) => state.employees);
  useEffect(() => {
    if (colaboradores.length === 0) dispatch(getEmployees());
  }, [dispatch]);

  const { error, validateForm } = useValidation();
  const register = async () => {
    try {
      const formIsValid = validateForm(form);
      if (formIsValid) {
        const colaboradorId = colaboradores.find(
          (colaborador) =>
            colaborador.lastname + " " + colaborador.name === form.colaborador
        )._id;
        if (!colaboradorId) {
          dispatch(setMessage("Colaborador no encontrado", "Error"));
          return;
        }
        await createAsistenciaVisitante({
          ...form,
          colaborador: colaboradorId,
        });
      } else {
        dispatch(setMessage("Faltan datos", "Error"));
      }
    } catch (error) {
      dispatch(setMessage(error, "Error"));
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

export default RegisterAsistenciaVisitante;
