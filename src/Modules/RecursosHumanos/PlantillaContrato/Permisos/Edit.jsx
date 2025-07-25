import { useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import Datos from "../Register/Datos";
import useValidation from "../ValidatePlantilla";
import PopUp from "../../../../recicle/popUps";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { deepDiff } from "../../../validateEdit";
import axios from "../../../../api/axios";
import documentoPlantilla from "../../../../api/cloudinaryPlantilla";
import { getPlantillasContrato } from "../../../../redux/modules/Recursos Humanos/actions";
import useSendMessage from "../../../../recicle/senMessage";

const EditPlantillaContrato = ({ setShowEdit, selected }) => {
  const [formData, setFormData] = useState({ ...selected });

  const { updatePlantillaContrato } = useAuth();
  const dispatch = useDispatch();
  const { error } = useValidation();
  const formFinal = deepDiff(selected, formData);
  const sendMessage = useSendMessage();

  const upDate = async () => {
    sendMessage("Cargando...", "Espere");
    try {
      if (Object.keys(formFinal).length > 0) {
        const pathDocumento = await documentoPlantilla(
          formData.archivo,
          dispatch
        );
        if (!pathDocumento) {
          sendMessage("Error al subir el documento", "Error");
          return;
        }

        await updatePlantillaContrato({
          ...formData,
          archivo: pathDocumento.secure_url,
        });
        dispatch(getPlantillasContrato());
      } else {
        sendMessage("No se han realizado cambios", "Error");
      }
    } catch (error) {
      await axios.delete("/deleteDocument", {
        data: { public_id: pathPhoto.public_id },
      });
      sendMessage(error || error.message, "Error");
    }
  };

  return (
    <Edit setShowEdit={setShowEdit} upDate={upDate}>
      <PopUp />
      <div className="flex h-full items-center justify-center">
        <Datos formData={formData} setFormData={setFormData} error={error} />
      </div>
    </Edit>
  );
};

export default EditPlantillaContrato;
