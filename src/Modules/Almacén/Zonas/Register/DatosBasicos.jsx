import Input from "../../../../recicle/Inputs/Inputs";

const DatosBasicos = ({ form, setForm, error, naves }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        label="Nombre"
        name="nombre"
        value={form.nombre}
        setForm={setForm}
        // errorOnclick={error.nombre}
      />
      <Input
        label="Almacen"
        name="almacen"
        type="select"
        options={naves}
        value={form.almacen}
        setForm={setForm}
        // errorOnclick={error.descripcion}
      />
      <Input
        label="Orientación"
        name="orientacion"
        type="select"
        options={["VERTICAL", "HORIZONTAL"]}
        value={form.orientacion}
        setForm={setForm}
        // errorOnclick={error.orientacion}
      />
    </div>
  );
};
export default DatosBasicos;
