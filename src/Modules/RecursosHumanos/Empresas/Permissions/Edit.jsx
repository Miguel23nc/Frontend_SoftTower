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
  const [hasChanges, setHasChanges] = useState({});
  useEffect(() => {
    setHasChanges(deepDiff(selected, { ...form, logo: `${form.logo}` }));
  }, [form, selected]);

  const upDate = async () => {
    dispatch(setMessage("Cargando...", "Cargando"));
    if (!hasChanges) return dispatch(setMessage("No hay cambios", "Error!!"));
    const upDateForm = {
      ...hasChanges,
      _id,
    };
    let pathLogo = form.logo;
    let pathSignature = form.representative.signature;
    try {
      if (hasChanges.logo) {
        pathLogo = await imageCloudinary(form.logo);
        if (!pathLogo) throw new Error("Error al subir el logo");
        upDateForm["logo"] = pathLogo.secure_url;
      }

      if (hasChanges.representative?.signature) {
        pathSignature = await imageCloudinary(form.representative.signature);
        if (!pathSignature) throw new Error("Error al subir la firma");

        upDateForm["representative"] = {
          ...form.representative,
          signature: pathSignature.secure_url,
        };
      }

      await updateBusiness(upDateForm);
      dispatch(getBusiness());
    } catch (error) {
      dispatch(setMessage(error.message, "Error!!"));
      if (pathLogo && pathLogo?.public_id) {
        await axios.delete("/deleteDocument", {
          data: { public_id: pathLogo.public_id },
        });
      }
      if (pathSignature && pathSignature?.public_id) {
        await axios.delete("/deleteDocument", {
          data: { public_id: pathSignature.public_id },
        });
      }
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
