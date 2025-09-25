import { useEffect, useState } from "react";
import Input from "../../../../recicle/Inputs/Inputs";
import unidadesDeMedida from "../../../../api/unidadDeMedida";
import axios from "../../../../api/axios";
import useSendMessage from "../../../../recicle/senMessage";

const ProductosUbicacion = ({ set, error, initialData }) => {
  const sendMessage = useSendMessage();

  const validateForm = (
    selectedCantidad,
    selectedDescripcion,
    selectedUnidadDeMedida,
    selectedSubItem
  ) => {
    const errors = {};
    if (!selectedCantidad) errors.selectedCantidad = "Se requiere una cantidad";
    if (!selectedDescripcion)
      errors.selectedDescripcion = "Se requiere una descripción";
    if (!selectedUnidadDeMedida)
      errors.selectedUnidadDeMedida = "Se requiere una unidad de medida";
    if (!selectedSubItem) errors.selectedSubItem = "Se requiere un sub item";
    return errors;
  };

  const [data, setData] = useState({
    cantidad: "",
    descripcion: "",
    unidadDeMedida: "UNIDAD",
    subItem: "",
  });

  const [search, setSearch] = useState(""); // texto de búsqueda
  const [options, setOptions] = useState([]); // resultados de búsqueda
  const [showSearch, setShowSearch] = useState(true); // controlar visibilidad del buscador

  // 🔄 Sincronizar con initialData
  useEffect(() => {
    if (initialData) {
      const newData = {
        cantidad: initialData.cantidad || initialData.productoId?.cantidad || "",
        descripcion: initialData.descripcion || initialData.productoId?.descripcion || "",
        unidadDeMedida: initialData.unidadDeMedida || "UNIDAD",
        subItem: initialData.subItem || initialData.productoId?.subItem || "",
      };
      
      setData(newData);
      set(newData); // Sincronizar con el padre inmediatamente
      
      // Ocultar buscador si ya hay datos iniciales
      if (newData.descripcion) {
        setShowSearch(false);
      }
    }
  }, [initialData]);

  // 🔄 Sincronizar cambios de data con el padre
  useEffect(() => {
    if (data.descripcion) { // Solo sincronizar si hay datos válidos
      set(data);
    }
  }, [data]); // Este efecto se ejecuta cuando data cambia

  // 🔎 Buscar productos
  const handleSearch = async (value) => {
    setSearch(value);
    if (value.length < 2) {
      setOptions([]);
      return;
    }
    try {
      const response = await axios.get(`/getStockAlmacen`, {
        params: { search: value },
      });
      setOptions(response.data.data);
    } catch (error) {
      sendMessage(error.message || "Error buscando productos", "Error");
    }
  };

  // ✅ Al seleccionar un producto
  const handleSelect = (producto) => {
    const newData = {
      descripcion: producto.productoId.descripcion,
      unidadDeMedida: producto.productoId.unidadDeMedida || "UNIDAD",
      subItem: producto.productoId.subItem || "",
      cantidad: producto.cantidadTotal || "1", // Valor por defecto 1
    };
    
    setData(newData);
    setShowSearch(false);
    setOptions([]);
    setSearch("");
  };

  // ✏️ Manejar cambios en los inputs manualmente
  const handleInputChange = (name, value) => {
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  // 🔄 Mostrar buscador para cambiar producto
  const handleEditProduct = () => {
    setShowSearch(true);
    setSearch("");
    setOptions([]);
  };

  const validateFormMultiple = validateForm(
    data.cantidad,
    data.descripcion,
    data.unidadDeMedida,
    data.subItem
  );

  return (
    <div className="w-full flex flex-wrap p-2 relative">
      {/* Botón para editar producto cuando ya hay uno seleccionado */}
      {!showSearch && data.descripcion && (
        <div className="w-full mb-2">
          <button
            type="button"
            onClick={handleEditProduct}
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            ✏️ Cambiar producto
          </button>
        </div>
      )}

      {showSearch ? (
        <div className="w-full mb-2 relative">
          <label className="text-base font-medium text-gray-700">
            Buscar por Descripción
          </label>
          <input
            type="text"
            value={search}
            placeholder="Escribe para buscar..."
            onChange={(e) => handleSearch(e.target.value)}
            className="mt-1 py-2 border px-3 w-[100%] !text-base rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {options.length > 0 && (
            <ul className="absolute top-full left-0 w-full border bg-white rounded-md shadow max-h-40 overflow-y-auto z-50">
              {options.map((producto) => (
                <li
                  key={producto?.productoId?._id || producto?.movimientoId}
                  onClick={() => handleSelect(producto)}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                >
                  {producto.productoId.descripcion} (
                  {producto.productoId.unidadDeMedida}) -{" "}
                  {producto.productoId.subItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <Input
            label="Descripción"
            name="descripcion"
            value={data.descripcion}
            setForm={handleInputChange}
            errorOnclick={error.descripcion}
          />
          <Input
            label="Unidad de Medida"
            name="unidadDeMedida"
            type="select"
            options={unidadesDeMedida.sort()}
            value={data.unidadDeMedida}
            setForm={handleInputChange}
            errorOnclick={error.unidadDeMedida}
          />
          <Input
            label="Sub Item"
            name="subItem"
            ancho={" h-10 !p-0"}
            type={"select"}
            options={["1.1", "1.2", "1.3"]}
            value={data.subItem}
            setForm={handleInputChange}
            errorOnclick={error.subItem}
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
            setForm={handleInputChange}
            errorOnclick={error.cantidad}
          />
        </>
      )}
    </div>
  );
};

export default ProductosUbicacion;