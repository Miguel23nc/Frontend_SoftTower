import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import InpuFiles from "../../../../recicle/Inputs/tipos/InputFile";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";
import { axiosOptions } from "../../../RecursosHumanos/Colaboradores/Register/Axios";

const DatosWidget = ({ setform, form, error }) => {
  const { modules } = axiosOptions();

  return (
    <CardPlegable title="Datos del Registro">
      <div className="flex">
        <Input
          label="Nombre"
          name="name"
          value={form.name}
          setForm={setform}
          errorOnclick={error.name}
        />
        <Input
          label="Key"
          name="key"
          value={form.key}
          setForm={setform}
          errorOnclick={error.key}
        />
        <InpuFiles
          label="Imagen"
          name="imagen"
          value={form.imagen}
          setForm={setform}
          errorOnclick={error.imagen}
        />
        <InputNormal
          label="Descripcion"
          name="description"
          value={form.description}
          setForm={setform}
        />

        <Input
          label="Grupo"
          name="grupo"
          type="select"
          options={modules.map((option) => {
            return option?.name?.toUpperCase();
          })}
          value={form.grupo}
          setForm={setform}
          errorOnclick={error.grupo}
        />
      </div>
    </CardPlegable>
  );
};

export default DatosWidget;
