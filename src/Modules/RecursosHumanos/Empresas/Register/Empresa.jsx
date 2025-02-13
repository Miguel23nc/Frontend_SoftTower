import Input from "../../../../recicle/Inputs/Inputs";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";

const DatosEmpresa = ({ error, setForm, form }) => {
  return (
    <div className="flex flex-wrap space py-8 p-12 items-center w-full">
      <Input
        label="RUC"
        name="ruc"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        setForm={setForm}
        maxLength={11}
        value={form.ruc}
        errorOnclick={error.ruc}
      />
      <Input
        label="Razón Social"
        name="razonSocial"
        setForm={setForm}
        value={form.razonSocial}
        errorOnclick={error.razonSocial}
      />
      <Input
        label="Dirección"
        name="address"
        value={form.address}
        setForm={setForm}
        errorOnclick={error.address}
      />
      <InpuFiles
        label="Logo"
        name="logo"
        setForm={setForm}
        errorOnclick={error.logo}
      />
    </div>
  );
};

export default DatosEmpresa;
