import { useEffect, useState } from "react";
import Edit from "../../../../components/Principal/Permissions/Edit";
import { useDispatch } from "react-redux";
import { getBusiness, setMessage } from "../../../../redux/actions";
import { useAuth } from "../../../../context/AuthContext";
import useValidation from "../validateEmpresas";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import PopUp from "../../../../recicle/popUps";
import { deepDiff } from "../../../validateEdit";
import imageCloudinary from "../../../../api/cloudinaryImage";
import DatosEmpresa from "../Register/Empresa";
import Representante from "../Register/Representante";

const EditBusiness = ({ setShowEdit, selected }) => {
  const _id = selected._id;
  const [form, setForm] = useState({ ...selected });
  const { updateBusiness, response } = useAuth();
  const dispatch = useDispatch();
  const { error } = useValidation();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(deepDiff(selected, { ...form, logo: `${form.logo}` }));
  }, [form]);

  const upDate = async () => {
    dispatch(setMessage("Cargando...", "Cargando"));

    try {
      const updatedForm = { ...hasChanges, _id };
      let pathLogo = form.logo;
      let pathSignature = form.representative.signature;

      if (hasChanges.logo) {
        pathLogo = await imageCloudinary(form.logo);
        if (!pathLogo) throw new Error("Error al subir el logo");
      }

      if (hasChanges.representative?.signature) {
        pathSignature = await imageCloudinary(form.representative.signature);
        if (!pathSignature) throw new Error("Error al subir la firma");
      }

      const finalForm = {
        ...updatedForm,
        logo: pathLogo,
        representative: {
          ...form.representative,
          signature: pathSignature,
        },
      };

      await updateBusiness(finalForm);
      dispatch(getBusiness());

      if (response) {
        dispatch(setMessage(response, "Ok"));
      } else {
        dispatch(setMessage("No se han realizado cambios", "Ups!"));
      }
    } catch (error) {
      dispatch(setMessage(error.message, "Error!!"));
    }
  };

  return (
    <Edit setShowEdit={setShowEdit} upDate={upDate}>
      <PopUp />
      <CardPlegable title="Datos de la Empresa">
        <DatosEmpresa form={form} setForm={setForm} error={error} />
      </CardPlegable>
      <CardPlegable title="Datos del Representante">
        <Representante form={form} setForm={setForm} error={error} />
      </CardPlegable>
    </Edit>
  );
};

export default EditBusiness;
