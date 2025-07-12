import Input from "../../../../recicle/Inputs/Inputs";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";

const DatosSedes = ({ form, setForm, error }) => {
  return (
    <div className="flex flex-wrap">
      <Input
        label="Nombre"
        name="nombre"
        value={form.nombre}
        setForm={setForm}
        errorOnclick={error.nombre}
      />
      <InputNormal
        label="Dirección"
        name="direccion"
        value={form.direccion}
        setForm={setForm}
      />
      <InputNormal
        label="Ciudad"
        name="ciudad"
        value={form.ciudad}
        setForm={setForm}
      />
      <Input
        label="Estado"
        name="estado"
        type="select"
        options={["ACTIVO", "INACTIVO"]}
        value={form.estado}
        setForm={setForm}
        errorOnclick={error.estado}
      />
    </div>
  );
};

export default DatosSedes;
