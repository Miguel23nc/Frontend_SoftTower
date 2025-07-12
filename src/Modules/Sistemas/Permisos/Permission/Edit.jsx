import { useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import Directorio from "../../../../components/RemoveAdd/RemoveItemAdd";
import FormMultiple from "./ModulosPermisos/FormMultiple";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";

const EditPermisos = ({ setShowEdit }) => {
  const [edition, setEdition] = useState({
    modules: [],
  });
  const error = {};

  return (
    <Edit
      setShowEdit={setShowEdit}
      upDate={() => console.log("upDate not implemented")}
    >
      <CardPlegable title="Módulos y Permisos">
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

export default EditPermisos;
