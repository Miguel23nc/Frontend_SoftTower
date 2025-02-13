import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { dateContact } from "../../validateCotizacion";
import Input from "../../../../../recicle/Inputs/Inputs";

const FormMultiple = ({ set, directorio, setErrorForm }) => {
  const [selectedDirectorio, setSelectedDirectorio] = useState("");
  const validate = dateContact(selectedDirectorio);
  useEffect(() => {
    if (selectedDirectorio) {
      set((prevData) => ({
        ...prevData,
        contactDirectory: selectedDirectorio.name,
        chargeDirectory: selectedDirectorio.charge,
        phoneCodeDirectory: selectedDirectorio.phoneCodeDirectory,
        phoneNumberDirectory: selectedDirectorio.phoneNumberDirectory,
        emailDirectory: selectedDirectorio.emailDirectory,
      }));
    }
  }, [selectedDirectorio]);
  useEffect(() => {
    if (Object.keys(validate).length > 0) {
      setErrorForm((prevData) => ({
        ...prevData,
        datosContacto: true,
      }));
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        datosContacto: false,
      }));
    }
  }, [Object.keys(validate).length]);
  const handleDirectorio = (e) => {
    const { value } = e;
    setSelectedDirectorio(value);
  };
  return (
    <div className="flex mt-4 items-end">
      <div className="flex flex-col h-20 ml-6 justify-center">
        <label className="text-base font-medium text-gray-700">Contacto</label>
        <Dropdown
          value={selectedDirectorio}
          onChange={handleDirectorio}
          options={directorio}
          optionLabel="name"
          placeholder="Contacto"
          className=" w-60 mt-1 rounded-lg border"
        />
      </div>
      <Input
        label="Cargo"
        type="charge"
        name="charge"
        disabled
        value={selectedDirectorio.charge || ""}
      />
      <Input
        label="Código"
        type="phoneCodeDirectory"
        name="phoneCodeDirectory"
        disabled
        width="w-24 ml-8 px-1"
        value={selectedDirectorio.phoneCodeDirectory || ""}
      />
      <Input
        label="Telefono"
        type="phoneNumber"
        name="phoneNumber"
        disabled
        value={selectedDirectorio.phoneNumberDirectory || ""}
      />
      <Input
        label="Correo electrónico"
        type="emailDirectory"
        name="emailDirectory"
        disabled
        value={selectedDirectorio.emailDirectory || ""}
      />
    </div>
  );
};

export default FormMultiple;
