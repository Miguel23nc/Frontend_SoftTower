import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { getEmployees, setMessage } from "../../../../redux/actions";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import PopUp from "../../../../recicle/popUps";
import FormOne from "../Register/DatosBásicos/FormOne";
import useValidation from "../Register/validate";
import Edit from "../../../../components/Principal/Permissions/Edit";
import Ubicacion from "../Register/DatosBásicos/Ubicacion";
import Directorio from "../../../../components/RemoveAdd/RemoveItemAdd";
import FormMultiple from "../Register/ModulosPermisos/FormMultiple";
import { deepDiff } from "../../../validateEdit";
import { validateModules, validateSubModules } from "./validateSubModule";

const EditEmployee = (props) => {
  const { setShowEdit, selected } = props;
  const { updateEmployee } = useAuth();
  const dispatch = useDispatch();
  console.log("selected", selected);

  const [edition, setEdition] = useState({
    ...selected,
    password: "",
  });
  const formFinal = deepDiff(selected, edition);
  console.log("formFinal", formFinal);

  const diferenciaModules = validateModules(selected.modules, edition.modules);
  const validateSubModule = validateSubModules(formFinal?.modules);
  const cleanEmptyObjects = (modules) => {
    return modules.filter(
      (module) =>
        Object.keys(module).length > 0 &&
        (module.name || module.submodule || module.permissions?.length)
    );
  };
  useEffect(() => {
    setEdition((prev) => ({
      ...prev,
      modules: cleanEmptyObjects(prev.modules),
    }));
  }, [Object.keys(diferenciaModules).length > 0]);

  const { error } = useValidation(edition);

  const upDate = async () => {
    dispatch(setMessage("Cargando...", "Espere"));

    try {
      if (Object.keys(formFinal).length > 0) {
        if (Object.keys(validateSubModule).length > 0) {
          dispatch(setMessage("Hay un Submodulo repetido", "Error"));
        } else if (
          Object.keys(formFinal).length === 1 &&
          formFinal.password === ""
        ) {
          dispatch(setMessage("No se han realizado cambios", "Error"));
        } else {
          await updateEmployee({ ...formFinal, _id: selected._id });
          dispatch(getEmployees());
        }
      }
    } catch (error) {
      console.error(error, "Error");
    }
  };

  return (
    <Edit setShowEdit={setShowEdit} upDate={upDate}>
      <PopUp />
      <CardPlegable title="Datos del Colaborador">
        <FormOne error={error} setForm={setEdition} form={edition} />
      </CardPlegable>
      <CardPlegable title="Ubicaión">
        <Ubicacion error={error} setForm={setEdition} form={edition} />
      </CardPlegable>
      <CardPlegable title="Módulos">
        <Directorio
          data="modules"
          estilos=" flex justify-center items-center"
          ItemComponent={FormMultiple}
          directory={edition.modules}
          setForm={setEdition}
          error={error}
        />
      </CardPlegable>
    </Edit>
  );
};

export default EditEmployee;
