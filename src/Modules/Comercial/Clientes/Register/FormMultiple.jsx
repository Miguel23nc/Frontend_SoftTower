import { useEffect, useState } from "react";
import Input from "../../../../recicle/Inputs/Inputs";

const FormMultiple = ({ set, resetForm, initialData }) => {
  const [directorio, setDirectorio] = useState({
    name: initialData?.name || "",
    charge: initialData?.charge || "",
    phoneCodeDirectory: initialData?.phoneCodeDirectory || "+51",
    phoneNumberDirectory: initialData?.phoneNumberDirectory || "",
    emailDirectory: initialData?.emailDirectory || "",
  });
  useEffect(() => {
    if (resetForm) {
      setDirectorio({
        name: "",
        charge: "",
        phoneCodeDirectory: "+51",
        phoneNumberDirectory: "",
        emailDirectory: "",
      });
    }
  }, [resetForm]);

  useEffect(() => {
    if (
      directorio.name &&
      directorio.charge &&
      directorio.phoneCodeDirectory &&
      directorio.phoneNumberDirectory &&
      directorio.emailDirectory
    ) {
      set(directorio);
    }
  }, [directorio]);

  const handleChangeCode = (e) => {
    setDirectorio((prevData) => ({
      ...prevData,
      phoneCodeDirectory: e,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDirectorio((prevData) => ({
      ...prevData,
      [name]: (name === "name" ? value.toUpperCase() : value),
    }));
  };

  return (
    <div className="flex mt-4 flex-wrap items-end">
      <Input
        label="Nombre y Apellido"
        type="text"
        name="name"
        pattern="[a-zA-Z\s]*"
        onKeyPress={(e) => {
          if (!/^[a-zA-Z\s]*$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        width={"w-80 ml-8"}
        onChange={handleChange}
        value={directorio.name}
      />
      <Input
        label="Cargo"
        type="text"
        name="charge"
        width="w-40 ml-8"
        value={directorio.charge}
        onChange={handleChange}
      />
      <div className="flex ml-8 ">
        <Input
          label="Pais"
          type="phoneCode"
          name="phoneCode"
          width="w-32 pt-3 py-2"
          value={directorio.phoneCodeDirectory}
          onChange={handleChangeCode}
        />
        <Input
          label="Telefono"
          type="text"
          width="mx-2 w-40"
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          name="phoneNumberDirectory"
          value={directorio.phoneNumberDirectory}
          onChange={handleChange}
        />
      </div>
      <Input
        label="Dirección de correo electrónico"
        type="email"
        name="emailDirectory"
        value={directorio.emailDirectory}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormMultiple;
