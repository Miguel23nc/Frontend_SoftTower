import { useDispatch } from "react-redux";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PopUp from "../../../../recicle/popUps";
import { setMessage } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import { useState } from "react";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";
import useValidation from "../ValidatePlantilla";
import documentoCloudinary from "../../../../api/cloudinaryDocument";
import Datos from "./Datos";

const Register = () => {
  const { createPlantillaContrato, response, errors } = useAuth();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    tipoContrato: "",
    archivo: "",
    state: "",
  });
  console.log("formData", formData);

  const { error, validateForm } = useValidation(formData);

  const onclick = async () => {
    dispatch(setMessage("Cargando...", "Espere"));
    try {
      const formIsValid = validateForm(formData);
      if (formIsValid) {
        const pathDocumento = await documentoCloudinary(
          formData.archivo,
          dispatch
        );
        if (!pathDocumento) {
          dispatch(setMessage("Error al subir el documento", "Error"));
          return;
        }
        await createPlantillaContrato({ ...formData, archivo: pathDocumento });
      } else {
        dispatch(setMessage("Faltan datos", "Error"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setMessage(error, "Error"));
    }
  };
  return (
    <div className="flex flex-col w-full p-6">
      <PopUp />
      <CardPlegable title="Datos del Contrato">
        <Datos formData={formData} setFormData={setFormData} error={error} />
      </CardPlegable>
      <div>
        <ButtonOk type="ok" children="Guardar" onClick={onclick} />
      </div>
    </div>
  );
};

export default Register;
