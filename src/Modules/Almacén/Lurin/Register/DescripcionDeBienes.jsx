import { useEffect, useState } from "react";
import Input from "../../../../recicle/Inputs/Inputs";
const unidadesDeMedida = [
  // Empaque / Presentación
  "CAJA",
  "PAQUETE",
  "BOLSA",
  "FARDO",
  "BULTO",
  "BLÍSTER",
  "ESTUCHE",
  "SOBRE",
  "ROLLO",
  "PALLET",
  "DISPLAY",
  "BANDEJA",
  "TIRA",
  "EMPAQUE",
  "CONTAINER",
  "CARTÓN",
  "BOTELLA",

  // Volumen
  "LITRO",
  "MILILITRO",
  "GALÓN",
  "BARRIL",
  "CUBETA",
  "CILINDRO",
  "BIDÓN",
  "DECILITRO",
  "CENTILITRO",
  "METRO CÚBICO",
  "CENTÍMETRO CÚBICO",
  "MILÍMETRO CÚBICO",

  // Peso
  "KILOGRAMO",
  "GRAMO",
  "TONELADA",
  "LIBRA",
  "ONZA",
  "SACO",
  "MILIGRAMO",
  "QUINTAL",

  // Longitud
  "METRO",
  "CENTÍMETRO",
  "MILÍMETRO",
  "PIE",
  "PULGADA",
  "YARDA",
  "KILÓMETRO",

  // Otras unidades
  "UNIDAD",
  "DOCENA",
  "MEDIA DOCENA",
  "PAR",
  "JUEGO",
  "KIT",
  "LOTE",
  "COMBO",
  "SERVICIO",
  "OTRO",

  // Unidades farmacéuticas / químicas / industriales
  "FRASCO",
  "VIAL",
  "TUBO",
  "TANQUE",
  "TAMBOR",
  "CÁPSULA",
  "TABLETA",
  "GRAGEA",
  "SOBRES",
  "JERINGA",
  "ENVASE",
  "GOTA",
  "DOSIS",
  "SPRAY",

  // Electrónica o industrial
  "PIEZA",
  "PLACA",
  "TIRA LED",
  "MODULO",
  "PAQUETE SMD",
  "CABLE",
  "ROLLO DE CABLE",

  // Informales pero usados
  "PUÑADO",
  "PIZCA",
  "CUCHARADA",
  "VASO",
  "TASA",
  "MEDIDA",
];

const DescripcionDeBienes = ({
  set,
  resetForm,
  error,
  initialData,
  ubicar,
}) => {
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
    unidadDeMedida: "",
    pesoNeto: "",
    pesoBruto: "",
    estadoEnvase: "",
    subItem: "",
  });
  useEffect(() => {
    if (initialData) {
      setData((prevData) => ({
        ...prevData,
        item: initialData.item || "",
        cantidad: initialData.cantidad || "",
        descripcion: initialData.descripcion || "",
        unidadDeMedida: initialData.unidadDeMedida || "",
        pesoNeto: initialData.pesoNeto || "",
        pesoBruto: initialData.pesoBruto || "",
        estadoEnvase: initialData.estadoEnvase || "",
        subItem: initialData.subItem || "",
      }));
    }
    if (resetForm) {
      setData((prevData) => ({
        ...prevData,
        item: "",
        cantidad: "",
        descripcion: "",
        unidadDeMedida: "",
        pesoNeto: "",
        pesoBruto: "",
        estadoEnvase: "",
        subItem: "",
      }));
    }
  }, [initialData, resetForm]);
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
  }, [data.item]);
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
        type={"select"}
        options={["1.1", "1.2", "1.3"]}
        value={data.subItem}
        setForm={setData}
        errorOnclick={error.subItem}
      />
      <div className="flex items-end pl-4 p-3">
        <button
          onClick={ubicar}
          className="shadow-lg rounded-lg hover:scale-110 transition-all duration-300 bg-gradient-to-r text-center items-center h-11 w-44 from-gray-50 to-gray-100"
        >
          <span className="text-gray-600 font-semibold">Ubicación</span>
        </button>
      </div>
    </div>
  );
};

export default DescripcionDeBienes;
