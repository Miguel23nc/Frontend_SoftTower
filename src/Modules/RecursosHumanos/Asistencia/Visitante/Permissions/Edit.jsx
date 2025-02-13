import { useState } from "react";
import useValidation from "../validateAsistenciaColaborador";
import CardPlegable from "../../../../../recicle/Divs/CardPlegable";
import Edit from "../../../../../components/Principal/Permissions/Edit";
import DatosDeAsistencia from "../Register/Asistencia";
import DatoDeColaborador from "../Register/Colaborador";
import { useAuth } from "../../../../../context/AuthContext";
import { simpleDiff } from "../../../../validateEdit";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../../redux/actions";

const EditAsistenciaVisitante = ({ setShowEdit, selected }) => {
  const [form, setForm] = useState({
    ...selected,
    colaborador:
      selected.colaborador.lastname + " " + selected.colaborador.name,
  });
  const dispatch = useDispatch();

  const { updateAsistenciaVisitante } = useAuth();
  const { error } = useValidation();
  const colaboradores = useSelector((state) => state.employees);
  const handleChanges = simpleDiff(form, selected);

  const updateAsistencia = async () => {
    try {
      if (Object.keys(handleChanges).length > 0) {
        const colaboradorId = colaboradores.find(
          (colaborador) =>
            colaborador.lastname + " " + colaborador.name === form.colaborador
        )._id;
        if (!colaboradorId) {
          dispatch(setMessage("Colaborador no encontrado", "Error"));
          return;
        }
        await updateAsistenciaVisitante({
          ...form,
          colaborador: colaboradorId,
        });
      } else {
        dispatch(setMessage("No se realizaron cambios", "Error"));
      }
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };
  return (
    <Edit setShowEdit={setShowEdit} upDate={updateAsistencia}>
      <CardPlegable title="Datos de Asistencia">
        <DatosDeAsistencia setForm={setForm} error={error} form={form} />
      </CardPlegable>
      <CardPlegable title="Datos del Colaborador">
        <DatoDeColaborador setForm={setForm} error={error} form={form} />
      </CardPlegable>
    </Edit>
  );
};

export default EditAsistenciaVisitante;
