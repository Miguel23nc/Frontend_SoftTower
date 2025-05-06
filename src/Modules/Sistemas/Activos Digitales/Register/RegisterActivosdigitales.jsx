import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";

const RegisterActivos = ({ formData, setFormData, error }) => {
  const monedas = ["PEN", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF"];
  return (
    <div>
      <CardPlegable title="Registrar Activo Digital">
        <div className="flex flex-wrap">
          <Input
            name="name"
            label="Nombre del Activo"
            value={formData.name}
            setForm={setFormData}
            errorOnclick={error.name}
          />
          <Input
            name="tipo"
            label="Tipo de Activo"
            value={formData.tipo}
            setForm={setFormData}
            errorOnclick={error.tipo}
          />
          <Input
            name="clave"
            label="Clave del Activo"
            value={formData.clave}
            setForm={setFormData}
            errorOnclick={error.clave}
          />
          <Input
            name="cantidad"
            label="Cantidad"
            value={formData.cantidad}
            setForm={setFormData}
            errorOnclick={error.cantidad}
          />
          <InputDate
            name="fecha_inicio"
            label="Fecha de Inicio"
            value={formData.fecha_inicio}
            setForm={setFormData}
            errorOnclick={error.fecha_inicio}
          />
          <InputDate
            name="fecha_vencimiento"
            label="Fecha de Vencimiento"
            value={formData.fecha_vencimiento}
            setForm={setFormData}
            errorOnclick={error.fecha_vencimiento}
          />

          <Input
            name="costo"
            label="Costo"
            value={formData.costo}
            setForm={setFormData}
            errorOnclick={error.costo}
          />
          <Input
            name="moneda"
            type="select"
            options={monedas}
            label="Moneda"
            value={formData.moneda}
            setForm={setFormData}
            errorOnclick={error.moneda}
          />
          <Input
            name="proveedor"
            label="Proveedor"
            value={formData.proveedor}
            setForm={setFormData}
            errorOnclick={error.proveedor}
          />
          <Input
            name="state"
            label="Estado"
            value={formData.state}
            setForm={setFormData}
            errorOnclick={error.state}
          />
        </div>
      </CardPlegable>
    </div>
  );
};

export default RegisterActivos;
