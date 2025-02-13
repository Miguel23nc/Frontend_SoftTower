// Register.js
import { useEffect, useState } from "react";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import { setMessage } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../recicle/popUps";
import useValidation from "./validateRegister";
import DateOfContract from "./Contrato";
import DatosBasicos from "./Datos";
import Colaborador from "./Colaborador";
import Planilla from "./Planilla";
import { useAuth } from "../../../../context/AuthContext";

const Register = () => {
  const { createContrato, response } = useAuth();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    typeContract: "",
    dateStart: "",
    dateEnd: "",
    empresa: {
      ruc: "",
      razonSocial: "",
      representative: "",
      representativeDocumentType: "",
      representativeDocumentNumber: "",
      domicilioFiscal: "",
    },
    colaborator: {
      name: "",
      charge: "",
      sueldo: "",
      documentType: "",
      documentNumber: "",
      address: "",
      email: "",
    },
    marcaAsistencia: "",
    codigoSPP: "",
    regimenPension: "",
  });
  console.log("formData", formData);

  const { error, validateForm } = useValidation(formData);

  const onclick = async () => {
    try {
      const formIsValid = validateForm(formData);
      if (formIsValid) {
        await createContrato(formData);
        if (response) {
          dispatch(setMessage(response, "Ok"));
        }
      } else {
        dispatch(setMessage("Faltan datos", "Error"));
      }
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    }
  };
  return (
    <div className="flex flex-col w-full p-6">
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
      {formData.typeContract !== "SERVICIOS" && (
        <CardPlegable title="Datos de fin de contrato">
          <Planilla setForm={setFormData} error={error} form={formData} />
        </CardPlegable>
      )}
      <div>
        <ButtonOk type="ok" children="Guardar" onClick={onclick} />
      </div>
    </div>
  );
};

export default Register;
