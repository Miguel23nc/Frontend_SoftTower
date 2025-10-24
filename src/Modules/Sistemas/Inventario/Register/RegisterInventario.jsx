import Input from "../../../../recicle/Inputs/Inputs";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";

const RegisterInventario = ({ error, formData, setFormData }) => {
  const sedes = ["SAN ISIDRO", "CHINCHA", "MOQUEGUA", "LA VICTORIA", "LURIN"];
  const areas = [
    "SISTEMAS",
    "RECURSOS HUMANOS",
    "CONTABILIDAD",
    "LOGISTICA",
    "FINANZAS",
    "ADMINISTRACION",
    "ALMACEN",
    "GERENCIA",
    "OTRO",
  ];

  return (
    <CardPlegable title="Registro de Inventario de Sistemas">
      <div className="flex flex-wrap">
        <Input
          name="codigo"
          setForm={setFormData}
          value={formData.codigo}
          label="Codigo"
          errorOnclick={error.codigo}
        />
        <Input
          name="categoria"
          setForm={setFormData}
          value={formData.categoria}
          label="Categoría"
          errorOnclick={error.categoria}
        />
        <Input
          name="marca"
          setForm={setFormData}
          value={formData.marca}
          label="Marca"
          errorOnclick={error.marca}
        />
        <Input
          name="modelo"
          setForm={setFormData}
          value={formData.modelo}
          label="Modelo"
          errorOnclick={error.modelo}
        />

        <Input
          name="especificaciones"
          setForm={setFormData}
          value={formData.especificaciones}
          label="Especificaciones"
          errorOnclick={error.especificaciones}
        />
        <Input
          name="area"
          type="select"
          options={areas}
          setForm={setFormData}
          value={formData.area}
          label="Área"
          errorOnclick={error.area}
        />

        <Input
          type="select"
          options={sedes}
          name="sede"
          setForm={setFormData}
          value={formData.sede}
          label="Sede"
          errorOnclick={error.sede}
        />
        <Input
          name="estado"
          type="select"
          options={["ACTIVO", "INACTIVO"]}
          setForm={setFormData}
          value={formData.estado}
          label="Estado"
          errorOnclick={error.estado}
        />
        <InputNormal
          name="observaciones"
          setForm={setFormData}
          value={formData.observaciones}
          label="Observaciónes"
        />
      </div>
    </CardPlegable>
  );
};

export default RegisterInventario;
