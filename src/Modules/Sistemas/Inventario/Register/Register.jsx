import { useState } from "react";
import CardPlegable from "../../../../recicle/Divs/CardPlegable";
import Input from "../../../../recicle/Inputs/Inputs";
import InputDate from "../../../../recicle/Inputs/tipos/InputDate";

const RegisterInventarioSistemas = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    encargado: "",
    fecha: "",
    sede: "",
    cantidad: "",
    state: "DISPONIBLE",
    descripcion: "",
    observacion: "",
  });

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
  const sedes = ["SAN ISIDRO", "CHINCHA", "MOQUEGUA", "LA VICTORIA"];
  return (
    <div className="px-10 ">
      <CardPlegable title="Registro de Inventario de Sistemas">
        <div className="flex flex-wrap">
          <Input
            type="text"
            name="name"
            setForm={setFormData}
            value={formData.name}
            label="Nombre del Sistema"
            placeholder="Nombre del Sistema"
          />
          <Input
            name="area"
            type="select"
            options={areas}
            setForm={setFormData}
            value={formData.area}
            label="Area"
            placeholder="Area"
          />
          <Input
            type="text"
            name="encargado"
            setForm={setFormData}
            value={formData.encargado}
            label="Encargado"
            placeholder="Encargado"
          />
          <InputDate
            name="fecha"
            setForm={setFormData}
            value={formData.fecha}
            label="Fecha"
            placeholder="Fecha"
          />
          <Input
            type="select"
            options={sedes}
            name="sede"
            setForm={setFormData}
            value={formData.sede}
            label="Sede"
            placeholder="Sede"
          />
          <Input
            name="cantidad"
            type="number"
            setForm={setFormData}
            value={formData.cantidad}
            label="Cantidad"
            placeholder="Cantidad"
          />
          <Input
            name="state"
            type="select"
            options={["ACTIVO", "INACTIVO", "DISPONIBLE"]}
            setForm={setFormData}
            value={formData.state}
            label="Estado"
          />
          <Input
            name="descripcion"
            setForm={setFormData}
            value={formData.descripcion}
            label="Descripción"
          />
          <Input
            name="observacion"
            setForm={setFormData}
            value={formData.observacion}
            label="Observación"
          />
        </div>
      </CardPlegable>
    </div>
  );
};

export default RegisterInventarioSistemas;
