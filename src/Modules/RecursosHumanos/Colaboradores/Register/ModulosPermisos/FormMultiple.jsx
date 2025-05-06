import { useEffect, useState } from "react";
import { axiosOptions } from "../Axios";
import { validateForm2 } from "../../../../../recicle/validate";
import Input from "../../../../../recicle/Inputs/Inputs";

const FormMultiple = ({ set, resetForm, initialData, error: errorOnclick }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissionsOrder, setPermissionsOrder] = useState([]);
  const { permissions, modules, submodules: sub } = axiosOptions();
  const [data, setData] = useState({
    modulo: "",
    submodulo: "",
  });

  const nameModules = modules.map((a) => a.name.toUpperCase());
  useEffect(() => {
    if (permissions.length > 0) {
      setPermissionsOrder(permissions.map((a) => a.name.toUpperCase()));
    }
  }, [permissions]);
  const submodulesName = (modulo) => {
    return sub
      .filter((a) => a.module.toUpperCase() === modulo)
      .map((a) => a.name.toUpperCase());
  };

  const validateFormMultiple = validateForm2(
    data.modulo,
    data.submodulo,
    selectedPermissions
  );

  useEffect(() => {
    if (initialData) {
      setData((prevData) => ({
        ...prevData,
        modulo: initialData.name || "",
        submodulo: initialData.submodule?.name || "",
      }));
      setSelectedPermissions(initialData.submodule?.permissions || []);
    }
    if (resetForm) {
      setData((prevData) => ({
        ...prevData,
        modulo: "",
        submodulo: "",
      }));

      setSelectedPermissions([]);
    }
  }, [initialData, resetForm]);

  useEffect(() => {
    if (Object.keys(validateFormMultiple).length === 0) {
      set({
        name: data.modulo,
        submodule: {
          name: data.submodulo,
          permissions: selectedPermissions,
        },
      });
    }
  }, [data.modulo, data.submodulo, selectedPermissions]);

  return (
    <div className="flex my-2 items-end flex-wrap justify-center">
      <Input
        label="Modulos"
        value={data.modulo}
        setForm={setData}
        options={nameModules}
        name="modulo"
        type="select"
      ></Input>
      <Input
        label="SubModulos"
        value={data.submodulo}
        setForm={setData}
        options={submodulesName(data.modulo)}
        name="submodulo"
        type="select"
      />

      <Input
        label="Permisos"
        name="permissions"
        setForm={setSelectedPermissions}
        value={selectedPermissions}
        options={permissionsOrder}
        type="multiSelect"
      />
    </div>
  );
};

export default FormMultiple;
