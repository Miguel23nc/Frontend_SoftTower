import { useEffect, useState } from "react";
import Input from "../../../../../recicle/Inputs/Inputs";
import {
  getdepartamentos,
  getdistritos,
  getprovincias,
} from "../../../../../recicle/Ubigeo";

const Ubicacion = ({ form, setForm, error }) => {
  const [formLocation, setFormLocation] = useState({
    ...form.location,
  });
  const departamentos = getdepartamentos();
  const provincias = getprovincias(formLocation?.departamento) || [];
  const distritos =
    getdistritos(formLocation?.departamento, formLocation?.provincia) || [];

  useEffect(() => {
    setForm({ ...form, location: formLocation });
  }, [formLocation]);
  return (
    <div className="flex flex-wrap space py-8 p-12 items-center w-full">
      <Input
        label="Departamento"
        name="departamento"
        type="select"
        options={departamentos}
        value={formLocation.departamento}
        setForm={setFormLocation}
        errorOnclick={error.location.departamento}
      />
      <Input
        label="Provincia"
        name="provincia"
        type="select"
        options={provincias}
        value={formLocation.provincia}
        setForm={setFormLocation}
        errorOnclick={error.location.provincia}
      />
      <Input
        label="Distrito"
        name="distrito"
        type="select"
        options={distritos}
        value={formLocation.distrito}
        setForm={setFormLocation}
        errorOnclick={error.location.distrito}
      />
      <Input
        label="Dirección"
        name="direccion"
        value={formLocation.direccion}
        setForm={setFormLocation}
        errorOnclick={error.location.direccion}
      />
    </div>
  );
};

export default Ubicacion;
