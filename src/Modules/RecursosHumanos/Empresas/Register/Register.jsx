import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  consultRuc,
  getEmployees,
  setMessage,
} from "../../../../redux/actions.js";
import { useAuth } from "../../../../context/AuthContext.jsx";
import PopUp from "../../../../recicle/popUps.jsx";
import ButtonOk from "../../../../recicle/Buttons/Buttons.jsx";
import imageCloudinary from "../../../../api/cloudinaryImage.jsx";
import CardPlegable from "../../../../recicle/Divs/CardPlegable.jsx";
import DatosEmpresa from "./Empresa.jsx";
import Representante from "./Representante.jsx";
import useValidation from "../validateEmpresas.js";

const Register = () => {
  const { postBusiness, response } = useAuth();
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [form, setForm] = useState({
    ruc: "",
    razonSocial: "",
    address: "",
    logo: "",
    representative: {
      name: "",
      documentType: "",
      documentNumber: "",
      signature: "",
    },
  });
  console.log("Register -> form", form);

  const responseRuc = useSelector((state) => state.ruc);
  const colaboradores = useSelector((state) => state.employees);

  useEffect(() => {
    if (colaboradores.length === 0) dispatch(getEmployees());
  }, [colaboradores]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (form.ruc.length === 11) {
      dispatch(consultRuc(form.ruc));
    } else {
      setForm((prevData) => ({
        ...prevData,
        razonSocial: "",
      }));
    }
  }, [form.ruc]);

  useEffect(() => {
    if (responseRuc?.razonSocial) {
      setForm((prevData) => ({
        ...prevData,
        razonSocial: responseRuc.razonSocial,
      }));
    }
  }, [responseRuc]);

  const { error, validateForm } = useValidation(form);
  console.log("Register -> error", error);

  const enviar = async () => {
    dispatch(setMessage("Cargando...", "Espere"));
    setDeshabilitar(true);
    try {
      const formIsValid = validateForm(form);
      console.log("EMPRESAS -> Register -> formIsValid", formIsValid);

      if (formIsValid) {
        const pathLogo = await imageCloudinary(form.logo);
        const pathSignature = await imageCloudinary(
          form.representative.signature
        );
        const newForm = {
          ...form,
          logo: pathLogo,
          representative: {
            ...form.representative,
            signature: pathSignature,
          },
        };
        await postBusiness(newForm);
        if (response) {
          dispatch(setMessage(response, "Ok"));
        }
      } else {
        dispatch(setMessage("Faltan datos", "Error"));
      }
    } catch (error) {
      dispatch(setMessage(error, "Error"));
    } finally {
      setDeshabilitar(false);
      dispatch(setMessage("", ""));
    }
  };

  return (
    <div className="flex flex-col">
      <PopUp disabled={deshabilitar} />
      <CardPlegable title="Datos de la Empresa">
        <DatosEmpresa error={error} setForm={setForm} form={form} />
      </CardPlegable>
      <CardPlegable title="Datos del Representante">
        <Representante error={error} setForm={setForm} form={form} />
      </CardPlegable>
      <div className="flex justify-center">
        <ButtonOk children="Enviar" onClick={enviar} type="ok" />
        <ButtonOk children="Cancelar" />
      </div>
    </div>
  );
};

export default Register;
