import { useDispatch } from "react-redux";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import PopUp from "../../../../recicle/popUps";
import { setMessage } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import { useState } from "react";
import useValidation from "../ValidatePlantilla";
import Datos from "./Datos";
import documentoPlantilla from "../../../../api/cloudinaryPlantilla";

const Register = () => {
  const { createPlantillaContrato, response, errors } = useAuth();
  const [deshabilitar, setDeshabilitar] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    tipoContrato: "",
    archivo: "",
    state: "",
  });

  const { error, validateForm } = useValidation(formData);

  const onclick = async () => {
    setDeshabilitar(true);
    dispatch(setMessage("Cargando...", "Espere"));
    try {
      const formIsValid = validateForm(formData);
      if (formIsValid) {
        const pathDocumento = await documentoPlantilla(
          formData.archivo,
          dispatch
        );
        if (!pathDocumento.secure_url) {
          dispatch(setMessage("Error al subir el documento", "Error"));
          return;
        }
        await createPlantillaContrato({
          ...formData,
          archivo: pathDocumento.secure_url,
        });
      } else {
        dispatch(setMessage("Faltan datos", "Error"));
      }
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    } finally {
      setDeshabilitar(false);
    }
  };
  return (
    <div className="flex flex-col w-full p-6">
      <PopUp deshabilitar={deshabilitar} />
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
