import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext"; // o tu input personalizado
import { Dropdown } from "primereact/dropdown"; // o tu propio estilo

const AsyncSelectInput = ({
  label,
  name,
  value,
  setForm,
  errorOnclick,
  fetchData,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (fetchData) {
        setLoading(true);
        fetchData(search).then((res) => {
          setOptions(res);
          setLoading(false);
        });
      }
    }, 300); // delay de 300ms para evitar muchas peticiones

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="w-full p-2">
      <label>{label}</label>
      <InputText
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="w-full mb-2"
      />
      <Dropdown
        value={value}
        options={options}
        onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.value }))}
        placeholder={loading ? "Cargando..." : "Seleccione"}
        className="w-full"
      />
      {errorOnclick && <small className="text-red-500">{errorOnclick}</small>}
    </div>
  );
};

export default AsyncSelectInput;
