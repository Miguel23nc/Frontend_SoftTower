import { useEffect, useState } from "react";
import unidadesDeMedida from "../../../..//api/unidadDeMedida";
import Input from "../../../../recicle/Inputs/Inputs";

const StockUbicacion = ({ set, error, initialData }) => {
  const validateForm = (
    selectedItem,
    selectedCantidad,
    selectedDescripcion,
    selectedUnidadDeMedida,
    selectedPesoNeto,
    selectedPesoBruto,
    selectedEstadoEnvase,
    selectedSubItem
  ) => {
    const errors = {};
    if (!selectedItem) errors.selectedItem = "Se requiere un item";
    if (!selectedCantidad) errors.selectedCantidad = "Se requiere una cantidad";
    if (!selectedDescripcion)
      errors.selectedDescripcion = "Se requiere una descripción";
    if (!selectedUnidadDeMedida)
      errors.selectedUnidadDeMedida = "Se requiere una unidad de medida";
    if (!selectedPesoNeto) errors.selectedPesoNeto = "Se requiere el peso neto";
    if (!selectedPesoBruto)
      errors.selectedPesoBruto = "Se requiere el peso bruto";
    if (!selectedEstadoEnvase)
      errors.selectedEstadoEnvase = "Se requiere el estado del envase";
    if (!selectedSubItem) errors.selectedSubItem = "Se requiere un sub item";
    return errors;
  };
  const [data, setData] = useState({
    item: "",
    cantidad: "",
    descripcion: "",
    unidadDeMedida: "UNIDAD",
    pesoNeto: "",
    pesoBruto: "",
    estadoEnvase: "",
    subItem: "",
  });

  useEffect(() => {
    if (initialData) {
      setData((prevData) => ({
        ...prevData,
        item: initialData.item || initialData.productoId?.item,
        cantidad: initialData.cantidad || initialData.productoId?.cantidad,
        descripcion:
          initialData.descripcion || initialData.productoId?.descripcion,
        unidadDeMedida: initialData.unidadDeMedida || "UNIDAD",
        pesoNeto: initialData.pesoNeto || initialData.productoId?.pesoNeto,
        pesoBruto: initialData.pesoBruto || initialData.productoId?.pesoBruto,
        estadoEnvase:
          initialData.estadoEnvase ||
          initialData.productoId?.estadoEnvase ||
          "",
        subItem: initialData.subItem || initialData.productoId?.subItem,
      }));
    }
  }, [initialData]);
  const validateFormMultiple = validateForm(
    data.item,
    data.cantidad,
    data.descripcion,
    data.unidadDeMedida,
    data.pesoNeto,
    data.pesoBruto,
    data.estadoEnvase,
    data.subItem
  );
  useEffect(() => {
    if (Object.keys(validateFormMultiple).length === 0) {
      set({
        item: data.item,
        cantidad: data.cantidad,
        descripcion: data.descripcion,
        unidadDeMedida: data.unidadDeMedida,
        pesoNeto: data.pesoNeto,
        pesoBruto: data.pesoBruto,
        estadoEnvase: data.estadoEnvase,
        subItem: data.subItem,
      });
    }
  }, [
    data.item,
    data.cantidad,
    data.descripcion,
    data.unidadDeMedida,
    data.pesoNeto,
    data.pesoBruto,
    data.estadoEnvase,
    data.subItem,
  ]);

  return (
    <div className="w-full flex flex-wrap p-2">
      <Input
        label="Item"
        name="item"
        value={data.item}
        setForm={setData}
        errorOnclick={error.item}
      />
      <Input
        label="Cantidad"
        name="cantidad"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={data.cantidad}
        setForm={setData}
        errorOnclick={error.cantidad}
      />
      <Input
        label="Descripción"
        name="descripcion"
        value={data.descripcion}
        setForm={setData}
        errorOnclick={error.descripcion}
      />
      <Input
        label="Unidad de Medida"
        name="unidadDeMedida"
        type="select"
        options={unidadesDeMedida.sort()}
        value={data.unidadDeMedida}
        setForm={setData}
        errorOnclick={error.unidadDeMedida}
      />
      <Input
        label="Peso Neto (Kg)"
        name="pesoNeto"
        onKeyPress={(e) => {
          if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={data.pesoNeto}
        setForm={setData}
        errorOnclick={error.pesoNeto}
      />
      <Input
        label="Peso Bruto (kg)"
        name="pesoBruto"
        onKeyPress={(e) => {
          if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={data.pesoBruto}
        setForm={setData}
        errorOnclick={error.pesoBruto}
      />
      <Input
        label="Estado del Envase"
        name="estadoEnvase"
        value={data.estadoEnvase}
        setForm={setData}
        errorOnclick={error.estadoEnvase}
      />
      <Input
        label="Sub Item"
        name="subItem"
        editable={false}
        ancho={" h-10 !p-0"}
        type={"select"}
        options={["1.1", "1.2", "1.3"]}
        value={data.subItem}
        setForm={setData}
        errorOnclick={error.subItem}
      />
    </div>
  );
};

export default StockUbicacion;
