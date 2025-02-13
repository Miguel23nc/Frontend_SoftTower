import { useEffect, useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import RegisterBoletaDePagos from "../Register/Register";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoletaDePagos,
  getEmployees,
  setMessage,
} from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import { deepDiff } from "../../../validateEdit";
import dayjs from "dayjs";

const EditBoletaDePagos = ({ setShowEdit, selected }) => {
  const dispatch = useDispatch();
  const colaboradores = useSelector((state) => state.employees);

  useEffect(() => {
    if (colaboradores.length === 0) dispatch(getEmployees());
  }, [colaboradores]);
  const { updateBoletasDePago } = useAuth();
  const colaboradorName =
    selected?.colaborador?.lastname + " " + selected?.colaborador?.name;
  const [form, setForm] = useState({
    ...selected,
    colaborador: colaboradorName,
    fechaBoletaDePago: selected?.fechaBoletaDePago
      ?.split("/")
      .reverse()
      .join("-"),
  });
  console.log("form", form);
  const [formEdit, setFormEdit] = useState({});
  console.log("formEdit", formEdit);

  const changes = deepDiff(form, formEdit);
  console.log("changes", changes);

  const upDate = async () => {
    try {
      if (Object.keys(changes).length === 0) {
        dispatch(setMessage("No hay cambios", "Error"));
        return;
      } else {
        const colaboradorId = colaboradores.find(
          (colaborador) =>
            colaborador.lastname + " " + colaborador.name === form.colaborador
        );
        let newForm = {
          _id: form._id,
          ...changes,
        };
        if (changes.fechaBoletaDePago) {
          newForm.fechaBoletaDePago = dayjs(changes.fechaBoletaDePago).format(
            "MM/YYYY"
          );
        }
        if (changes.colaborador) {
          newForm.colaborador = colaboradorId._id;
        }
        console.log("form apunto de enviar: ", newForm);
        await updateBoletasDePago(newForm);
        dispatch(getBoletaDePagos());
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setMessage(error, "Error"));
    }
  };
  return (
    <Edit setShowEdit={setShowEdit} upDate={upDate}>
      <RegisterBoletaDePagos
        formInitial={form}
        descuentoInitial={form?.descuentosAlTrabajador}
        aporteinitial={form?.aportacionesDelEmpleador}
        setFormEdit={setFormEdit}
      />
    </Edit>
  );
};

export default EditBoletaDePagos;
