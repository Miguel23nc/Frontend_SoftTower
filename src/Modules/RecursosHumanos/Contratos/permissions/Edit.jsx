import { useEffect, useRef, useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import useValidation from "../Register/validateRegister";
import PopUp from "../../../../recicle/popUps";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { getContracts, setMessage } from "../../../../redux/actions";
import DateOfContract from "../Register/Contrato";
import Colaborador from "../Register/Colaborador";
import { deepDiff, deepEqual, simpleDiff } from "../../../validateEdit";

const EditContract = ({ setShowEdit, selected }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    ...selected,
    colaborator: {
      ...selected.colaborador,
      empresa: selected.colaborador.business,
      address: selected.colaborador.location.direccion,
    },
  });
  console.log("formData", formData);

  const { updateContrato, response } = useAuth();
  const { error } = useValidation(formData);
  const detectChanges = deepDiff(selected, formData);
  console.log("detectChanges", detectChanges);

  const upDate = async () => {
    if (Object.keys(detectChanges).length > 0) {
      let newForm = {
        ...detectChanges,
        _id: selected._id,
      };
      if (detectChanges.colaborator) {
        if (
          detectChanges.colaborator._id === selected.colaborador._id &&
          Object.keys(detectChanges).length === 1
        ) {
          return dispatch(setMessage("No se han realizado cambios", "Info"));
        } else if (
          detectChanges.colaborator._id === selected.colaborador._id &&
          Object.keys(detectChanges).length > 1
        ) {
          newForm = {
            ...newForm,
            colaborador: formData.colaborator._id,
          };
        }
        delete newForm?.colaborator;
        console.log("newForm", newForm);
      }

      await updateContrato(newForm);
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

      <CardPlegable title="Datos del colaborador">
        <Colaborador setForm={setFormData} error={error} form={formData} />
      </CardPlegable>
    </Edit>
  );
};

export default EditContract;
