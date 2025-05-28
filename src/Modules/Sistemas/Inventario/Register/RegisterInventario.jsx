import Input from "../../../../recicle/Inputs/Inputs";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";

import InputDate from "../../../../recicle/Inputs/tipos/InputDate";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";

const RegisterInventario = ({
  error,
  formData,
  setFormData,
  colaboradores,
}) => {
  const sedes = ["SAN ISIDRO", "CHINCHA", "MOQUEGUA", "LA VICTORIA"];
  const areas = [
    "SISTEMAS",
    "RECURSOS HUMANOS",
    "CONTABILIDAD",
    "LOGISTICA",
    "FINANZAS",
    "ADMINISTRACION",
    "ALMACEN",
    "COMPRAS",
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
          name="name"
          setForm={setFormData}
          value={formData.name}
          label="Nombre"
          errorOnclick={error.name}
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
        <InputDate
          name="fecha"
          setForm={setFormData}
          value={formData.fecha}
          label="Fecha de Registro"
          errorOnclick={error.fecha}
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
          name="cantidad"
          type="number"
          setForm={setFormData}
          value={formData.cantidad}
          label="Cantidad"
          errorOnclick={error.cantidad}
        />
        <Input
          name="state"
          type="select"
          options={["ACTIVO", "INACTIVO"]}
          setForm={setFormData}
          value={formData.state}
          label="Estado"
          errorOnclick={error.state}
        />
        <InputNormal
          name="observacion"
          setForm={setFormData}
          value={formData.observacion}
          label="Observación"
        />
      </div>
    </CardPlegable>
  );
};

export default RegisterInventario;
