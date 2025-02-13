import { useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import Datos from "../Register/Datos";
import useValidation from "../ValidatePlantilla";
import PopUp from "../../../../recicle/popUps";
import { useDispatch } from "react-redux";
import { getPlantillasContrato, setMessage } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import documentoCloudinary from "../../../../api/cloudinaryDocument";
import { deepDiff } from "../../../validateEdit";
import { get } from "react-hook-form";

const EditPlantillaContrato = ({ setShowEdit, selected }) => {
  const [formData, setFormData] = useState({ ...selected });
  console.log("formData", formData);
  console.log("selected", selected);

  const { updatePlantillaContrato } = useAuth();
  const dispatch = useDispatch();
  const { error } = useValidation();
  const formFinal = deepDiff(selected, formData);
  console.log("formFinal", formFinal);

  const upDate = async () => {
    dispatch(setMessage("Cargando...", "Espere"));
    try {
      if (Object.keys(formFinal).length > 0) {
        if (formData.archivo === selected.archivo) {
          await updatePlantillaContrato(formData);
          dispatch(getPlantillasContrato());
        } else {
          const pathDocumento = await documentoCloudinary(
            formData.archivo,
            dispatch
          );
          if (!pathDocumento) {
            dispatch(setMessage("Error al subir el documento", "Error"));
            return;
          } else {
            await updatePlantillaContrato({
              ...formData,
              archivo: pathDocumento,
            });
            dispatch(getPlantillasContrato());
          }
        }
      } else {
        dispatch(setMessage("No se han realizado cambios", "Error"));
      }
    } catch (error) {
      console.log("error", error);
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
