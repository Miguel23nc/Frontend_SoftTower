import { useEffect, useState } from "react";
import PopUp from "../../../../recicle/popUps";
import FormOne from "./DatosBásicos/FormOne";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import { useAuth } from "../../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../redux/actions";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import FormMultiple from "./ModulosPermisos/FormMultiple";
import RemoveItemAdd from "../../../../components/RemoveAdd/RemoveItemAdd";
import Ubicacion from "./DatosBásicos/Ubicacion";
import imageCloudinary from "../../../../api/cloudinaryImage";
import useValidation from "./validate";
import ExcelColaboradores from "../Permissions/ExcelBoletas";
import axios from "../../../../api/axios";

const Register = () => {
  const { signup, response } = useAuth();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    documentType: "",
    documentNumber: "",
    type: "",
    dateOfBirth: "",
    genre: "",
    phone: "",
    telephone: "",
    civilStatus: "",
    email: "",
    location: {
      departamento: "",
      provincia: "",
      distrito: "",
      direccion: "",
    },
    business: "",
    sede: "",
    charge: "",
    sueldo: "",
    user: "",
    photo: "",
    password: "",
    modules: [
      {
        name: "",
        submodule: {
          name: "",
          permissions: [],
        },
      },
    ],
  });

  const { error, validateForm } = useValidation(formData);
  const register = async () => {
    dispatch(setMessage("Espere por favor...", "Cargando"));
    const formIsValid = validateForm(formData);
    let pathPhoto = null; // Definirlo antes del try

    try {
      if (formIsValid) {
        pathPhoto = await imageCloudinary(formData.photo);
        dispatch(setMessage(pathPhoto, "Cargando"));
        await signup({ ...formData, photo: pathPhoto.secure_url });
        if (response) {
          dispatch(setMessage(response, "Ok"));
        }
      } else {
        dispatch(setMessage("Faltan datos", "Error"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setMessage(error, "Error"));
      if (pathPhoto && pathPhoto.public_id) {
        await axios.delete("/deleteDocument", {
          data: { public_id: pathPhoto.public_id },
        });
      }
    }
  };

  console.log("formData", formData);

  return (
    <div className="flex flex-col w-full p-6">
      <ExcelColaboradores />
      <PopUp />
      <CardPlegable title="Datos del Colaborador">
        <FormOne setForm={setFormData} error={error} form={formData} />
      </CardPlegable>
      <CardPlegable title="Ubicación">
        <Ubicacion setForm={setFormData} error={error} form={formData} />
      </CardPlegable>
      <CardPlegable title="Permisos">
        <RemoveItemAdd
          ItemComponent={FormMultiple}
          data="modules"
          estilos=" flex justify-center items-center"
          directory={formData.modules}
          setForm={setFormData}
          error={error}
        />
      </CardPlegable>

      <div className="flex justify-center ">
        <ButtonOk type="ok" onClick={register} children="Registrar" />
        <ButtonOk children="Cancelar" onClick={() => setResetForm(true)} />
      </div>
    </div>
  );
};

export default Register;
