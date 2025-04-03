import { useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import Datos from "../Register/Datos";
import useValidation from "../ValidatePlantilla";
import PopUp from "../../../../recicle/popUps";
import { useDispatch } from "react-redux";
import { getPlantillasContrato, setMessage } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import { deepDiff } from "../../../validateEdit";
import axios from "../../../../api/axios";
import documentoPlantilla from "../../../../api/cloudinaryPlantilla";

const EditPlantillaContrato = ({ setShowEdit, selected }) => {
  const [formData, setFormData] = useState({ ...selected });

  const { updatePlantillaContrato } = useAuth();
  const dispatch = useDispatch();
  const { error } = useValidation();
  const formFinal = deepDiff(selected, formData);

  const upDate = async () => {
    dispatch(setMessage("Cargando...", "Espere"));
    try {
      if (Object.keys(formFinal).length > 0) {
        const pathDocumento = await documentoPlantilla(
          formData.archivo,
          dispatch
        );
        if (!pathDocumento) {
          dispatch(setMessage("Error al subir el documento", "Error"));
          return;
        }

        await updatePlantillaContrato({
          ...formData,
          archivo: pathDocumento.secure_url,
        });
        dispatch(getPlantillasContrato());
      } else {
        dispatch(setMessage("No se han realizado cambios", "Error"));
      }
    } catch (error) {
      await axios.delete("/deleteDocument", {
        data: { public_id: pathPhoto.public_id },
      });
      dispatch(setMessage(error, "Error"));
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
