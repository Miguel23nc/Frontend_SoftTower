import { useEffect, useState } from "react";
import Input from "../../../../recicle/Inputs/Inputs";
import InputNormal from "../../../../recicle/Inputs/tipos/Normal";
import UbicarProducto from "./Ubicar";
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
  sendMessage,
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
    unidadDeMedida: "UNIDAD",
    pesoNeto: "",
    pesoBruto: "",
    estadoEnvase: "",
    subItem: "",
    ubicacion: null,
  });
  console.log("Initial Data:", initialData);

  useEffect(() => {
    if (initialData) {
      setData((prevData) => ({
        ...prevData,
        item: initialData.item || initialData.productoId?.item || "",
        cantidad:
          initialData.cantidad || initialData.productoId?.cantidad || "",
        descripcion:
          initialData.descripcion || initialData.productoId?.descripcion || "",
        unidadDeMedida: initialData.unidadDeMedida || "UNIDAD",
        pesoNeto:
          initialData.pesoNeto || initialData.productoId?.pesoNeto || "",
        pesoBruto:
          initialData.pesoBruto || initialData.productoId?.pesoBruto || "",
        estadoEnvase:
          initialData.estadoEnvase ||
          initialData.productoId?.estadoEnvase ||
          "",
        subItem: initialData.subItem || initialData.productoId?.subItem || "",
        ubicacion: initialData.ubicacion || initialData.ubicacionId || null,
      }));
    }
    if (resetForm) {
      setData((prevData) => ({
        ...prevData,
        item: "",
        cantidad: "",
        descripcion: "",
        unidadDeMedida: "UNIDAD",
        pesoNeto: "",
        pesoBruto: "",
        estadoEnvase: "",
        subItem: "",
        ubicacion: null,
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
  // Reemplaza todos los efectos relacionados con `set` por este único efecto:
  useEffect(() => {
    set({
      ...data,
      ubicacion: data.ubicacion || null,
    });
  }, [
    data.item,
    data.cantidad,
    data.descripcion,
    data.unidadDeMedida,
    data.pesoNeto,
    data.pesoBruto,
    data.estadoEnvase,
    data.subItem,
    data.ubicacion,
  ]);
  const [reservados, setReservados] = useState([]);

  const [openUbicar, setOpenUbicar] = useState(false);
  const showUbicar = () => {
    if (Object.keys(validateFormMultiple).length > 0) {
      sendMessage(
        "Debe completar todos los campos antes de ubicar el producto",
        "Espere"
      );
      return;
    }
    setOpenUbicar(true);
  };
  const ubicar = async (ubicacion) => {
    try {
      if (!ubicacion) {
        sendMessage("Debe completar todos los campos de ubicación", "Error");
        return;
      }
      setData((prevData) => ({
        ...prevData,
        ubicacion, // Recibe directamente el objeto
      }));
      setOpenUbicar(false);
    } catch (error) {
      sendMessage(error.message || "Error al ubicar el producto", "Error");
    }
  };

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

      {data.ubicacion && (
        <div className="w-full flex flex-col mx-3 ">
          <label className={`text-base font-medium  "text-gray-700" `}>
            Ubicación Seleccionada
          </label>
          <div className="flex flex-wrap mt-2 p-2 border rounded-md bg-gray-50">
            <span className="text-sm text-gray-700 mx-4 m-1 bg-white border px-3 py-2 rounded-lg shadow-lg">
              🟡 Nave: {data.ubicacion.nave} - Zona: {data.ubicacion.zona} -
              Rack: {data.ubicacion.rack} - Nivel: {data.ubicacion.nivel} -
              Sección: {data.ubicacion.seccion}
            </span>
          </div>
        </div>
      )}
      {openUbicar && (
        <UbicarProducto
          setShowUbicar={setOpenUbicar}
          reservados={reservados}
          setReservados={setReservados}
          ubicar={ubicar}
        />
      )}
      <div className="flex items-end pl-4 p-3">
        <button
          onClick={showUbicar}
          className="shadow-lg rounded-lg hover:scale-110 transition-all duration-300 bg-gradient-to-r text-center items-center h-11 w-44 from-gray-50 to-gray-100"
        >
          <span className="text-gray-600 font-semibold">Ubicación</span>
        </button>
      </div>
    </div>
  );
};

export default DescripcionDeBienes;
