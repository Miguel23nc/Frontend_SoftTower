import { useEffect, useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import RegisterInventario from "../Register/RegisterInventario";
import useValidation from "../validacion";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../../redux/actions";
import { deepDiff } from "../../../validateEdit";

const EditInventario = ({ setShowEdit, selected }) => {
  const [formData, setFormData] = useState({ ...selected });
  const [edit, setEdit] = useState({
    ...selected,
    encargado: selected?.encargado?.lastname + " " + selected?.encargado?.name,
  });
  const colaboradores = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    if (colaboradores.length === 0) {
      dispatch(getEmployees());
    }
  }, [colaboradores, dispatch]);
  const { error, validateForm } = useValidation();
  const depp = deepDiff(selected, formData);
  console.log("depp", depp);
  
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
    <Edit setShowEdit={setShowEdit} upDate={enviarInventario}>
      <div className="flex p-12">
        <RegisterInventario
          setFormData={setEdit}
          colaboradores={colaboradores}
          formData={edit}
          error={error}
        />
      </div>
    </Edit>
  );
};

export default EditInventario;
