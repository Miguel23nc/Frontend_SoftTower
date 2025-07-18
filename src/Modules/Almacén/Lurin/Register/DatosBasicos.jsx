import Input from "../../../../recicle/Inputs/Inputs";
import AsyncSelectInput from "../../../../recicle/Inputs/tipos/InputSearch";

const DatosBasicos = ({ form, setForm, contratoOptions, error }) => {
  // const fetchCodigosIngreso = async (query) => {
  //   const res = await axios.get("/api/codigos-ingreso", {
  //     params: {
  //       search: query,
  //       limit: 10,
  //     },
  //   });
  //   return res.data.map((item) => ({
  //     label: item.codigo, // lo que se ve en el dropdown
  //     value: item.codigo, // lo que se guarda en el estado
  //   }));
  // };
  return (
    <div className="w-full flex flex-wrap">
      <Input
        label="Movimiento"
        name="movimiento"
        type="select"
        options={["INGRESO", "SALIDA"]}
        value={form.movimiento}
        setForm={setForm}
        errorOnclick={error.movimiento}
      />
      {form.movimiento === "SALIDA" && (
        <AsyncSelectInput
          label="Código de Ingreso"
          name="codigoIngreso"
          type="select"
          value={form.codigoIngreso}
          setForm={setForm}
          errorOnclick={error.codigoIngreso}
        />
      )}

      <Input
        label="Contrato"
        name="contrato"
        type="select"
        options={contratoOptions}
        value={form.contrato}
        setForm={setForm}
        errorOnclick={error.contrato}
      />
      <Input
        label="Número de Acta"
        name="numeroDeActa"
        value={form.numeroDeActa}
        setForm={setForm}
        errorOnclick={error.numeroDeActa}
      />
      <Input
        label="Contribuyente"
        name="contribuyente"
        value={form.contribuyente}
        setForm={setForm}
        errorOnclick={error.contribuyente}
      />
      <Input
        label="Numero de Documento"
        name="numeroDocumento"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.numeroDocumento}
        setForm={setForm}
        errorOnclick={error.numeroDocumento}
      />
    </div>
  );
};

export default DatosBasicos;
