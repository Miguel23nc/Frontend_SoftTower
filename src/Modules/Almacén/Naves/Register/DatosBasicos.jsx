import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";

const DatosBasicos = ({ form, setForm, error, sedesName }) => {
  return (
    <div className="px-5">
      <CardPlegable title="Datos Básicos">
        <div className="flex flex-wrap">
          <Input
            label="Nombre"
            name="nombre"
            value={form.nombre}
            setForm={setForm}
            errorOnclick={error.nombre}
          />
          <Input
            label="Sede"
            name="sede"
            value={form.sede}
            setForm={setForm}
            options={sedesName}
            type="select"
            errorOnclick={error.sede}
          />
          <InputNormal
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            setForm={setForm}
          />
        </div>
      </CardPlegable>
    </div>
  );
};

export default DatosBasicos;
