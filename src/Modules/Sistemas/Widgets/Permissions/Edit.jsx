import { useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import DatosWidget from "../Register/Datos";
import useValidation from "../Register/validateWidgets";
import useSendMessage from "../../../../recicle/senMessage";
import { useAuth } from "../../../../context/AuthContext";
import { deepDiff } from "../../../validateEdit";
import PopUp from "../../../../recicle/popUps";
import imageCloudinary from "../../../../api/cloudinaryImage";
import axios from "../../../../api/axios";

const EditWidget = ({ setShowEdit, selected }) => {
  const [edit, setEdit] = useState({ ...selected });
  const { error, validateForm } = useValidation();
  const sendMessage = useSendMessage();
  const { patchWidget } = useAuth();
  const diferencias = deepDiff(selected, edit);

  const [deshabilitar, setDeshabilitar] = useState(false);
  const updateWidget = async () => {
    const validacion = validateForm(edit);
    if (!validacion) {
      sendMessage("Complete todos los campos", "Error");
      return;
    }
    if (Object.keys(diferencias).length === 0) {
      sendMessage("No hay cambios para guardar", "Error");
      return;
    }
    try {
      setDeshabilitar(true);
      sendMessage("Cargando...", "Espere");
      if (diferencias.imagen) {
        const pathImage = await imageCloudinary(edit.imagen);
        diferencias.imagen = pathImage.secure_url;
      }
      await patchWidget({ ...diferencias, _id: selected._id });
    } catch (error) {
      sendMessage(error, "Error");
      await axios.delete("/deleteDocument", {
        data: { public_id: pathCloudinary.public_id },
      });
    }
  };
  return (
    <Edit setShowEdit={setShowEdit} upDate={() => updateWidget()}>
      <PopUp deshabilitar={deshabilitar} />
      <div className="p-12">
        <DatosWidget setform={setEdit} form={edit} error={error} />
      </div>
    </Edit>
  );
};

export default EditWidget;
