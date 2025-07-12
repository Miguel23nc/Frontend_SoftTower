import Input from "../../../../recicle/Inputs/Inputs";

const DatosBasicos = ({ form, setForm, error, sedes }) => {
  return (
    <div className="flex flex-wrap">
      <Input
        label="Cliente"
        name="cliente"
        value={form.cliente}
        setForm={setForm}
        errorOnclick={error.cliente}
      />
      <Input
        label="Sede"
        name="sede"
        type={"select"}
        options={sedes}
        value={form?.sede}
        setForm={setForm}
        errorOnclick={error.sede}
      />
      <Input
        label="Fecha de Inicio"
        name="fechaInicio"
        type="date"
        value={form.fechaInicio}
        setForm={setForm}
        errorOnclick={error.fechaInicio}
      />
      <Input
        label="Fecha de Fin"
        name="fechaFin"
        type="date"
        value={form.fechaFin}
        setForm={setForm}
        errorOnclick={error.fechaFin}
      />
      <Input
        label="Estado"
        name="estado"
        type="select"
        options={["ACTIVO", "INACTIVO", "FINALIZADO", "CANCELADO", "PENDIENTE"]}
        value={form.estado}
        setForm={setForm}
        errorOnclick={error.estado}
      />
    </div>
  );
};

export default DatosBasicos;
