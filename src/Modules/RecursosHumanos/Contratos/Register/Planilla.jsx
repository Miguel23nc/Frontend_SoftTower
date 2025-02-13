import Input from "../../../../recicle/Inputs/Inputs";

const Planilla = ({ setForm, error, form }) => {
  return (
    <div className="flex flex-wrap">
      <Input
        name="marcaAsistencia"
        label="Marca Asistencia"
        type="select"
        options={["SI", "NO"]}
        setForm={setForm}
        value={form.marcaAsistencia || ""}
        errorOnclick={error.marcaAsistencia}
      />
      <Input
        name="codigoSPP"
        label="Codigo SPP"
        type="text"
        setForm={setForm}
        value={form.codigoSPP || ""}
        errorOnclick={error.codigoSPP}
      />
      <Input
        name="regimenPension"
        label="Regimen Pension"
        type="select"
        options={["AFP", "ONP"]}
        setForm={setForm}
        value={form.regimenPension || ""}
        errorOnclick={error.regimenPension}
      />
    </div>
  );
};

export default Planilla;
