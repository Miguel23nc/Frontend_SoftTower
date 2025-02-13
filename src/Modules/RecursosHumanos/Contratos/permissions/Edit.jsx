import { useEffect, useRef, useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import useValidation from "../Register/validateRegister";
import PopUp from "../../../../recicle/popUps";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { getContracts, setMessage } from "../../../../redux/actions";
import DateOfContract from "../Register/Contrato";
import DatosBasicos from "../Register/Datos";
import Colaborador from "../Register/Colaborador";
import { deepDiff, deepEqual, simpleDiff } from "../../../validateEdit";

const EditContract = ({ setShowEdit, selected }) => {
  const [formData, setFormData] = useState({
    ...selected,
  });
  console.log("selected", selected);
  console.log("formData", formData);

  const { updateContrato, response } = useAuth();
  const dispatch = useDispatch();
  const { error } = useValidation(formData);
  const detectChanges = deepDiff(selected, formData);
  console.log("detectChanges", detectChanges);

  const upDate = async () => {
    if (Object.keys(detectChanges).length > 0) {
      if (detectChanges.colaborator) {
        //voy a aliminar todo esto, solo va a ser necesario deepDiff
        //cuando actualice el back para que acepte hasta el mas minimo cambio
        const colaborador = {
          ...formData.colaborator,
          ...detectChanges.colaborator,
        };
        await updateContrato({
          ...detectChanges,
          colaborator: colaborador,
          _id: selected._id,
        });
        dispatch(getContracts());
      }
      if (detectChanges.empresa) {
        const colaborador = {
          ...formData.empresa,
          ...detectChanges.empresa,
        };

        await updateContrato({
          ...detectChanges,
          empresar: colaborador,
          _id: selected._id,
        });
        dispatch(getContracts());
      }
      await updateContrato({ ...detectChanges, _id: selected._id });
      dispatch(getContracts());
    } else {
      dispatch(setMessage("No se han realizado cambios", "Info"));
    }
  };
  return (
    <Edit setShowEdit={setShowEdit} upDate={upDate}>
      <PopUp />
      <CardPlegable title="Datos del Contrato">
        <DateOfContract
          error={error}
          setFormData={setFormData}
          formData={formData}
        />
      </CardPlegable>
      <CardPlegable title="Datos de la Empresa">
        <DatosBasicos setForm={setFormData} error={error} form={formData} />
      </CardPlegable>
      <CardPlegable title="Datos del colaborador">
        <Colaborador setForm={setFormData} error={error} form={formData} />
      </CardPlegable>
    </Edit>
  );
};

export default EditContract;
