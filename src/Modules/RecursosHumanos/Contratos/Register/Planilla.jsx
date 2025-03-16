import Input from "../../../../recicle/Inputs/Inputs";

const Planilla = ({ setForm, error, form }) => {
  return (
    <div className="flex flex-wrap">
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
        options={[
          "PRIMA",
          "PRIMA MIXTA",
          "ONP",
          "INTEGRA",
          "INTEGRA MIXTA",
          "HABITAD",
          "HABITAD MIXTA",
          "PROFUTURO",
          "PROFUTURO MIXTA",
        ]}
        setForm={setForm}
        value={form.regimenPension || ""}
        errorOnclick={error.regimenPension}
      />
    </div>
  );
};

export default Planilla;
