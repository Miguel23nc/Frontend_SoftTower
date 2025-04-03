import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../redux/actions";

const InpuFiles = (props) => {
  const { label, name, errorOnclick, ancho, setForm, type } = props;

  const [animation, setAnimation] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la carga
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

  const styleError = "border-red-500 animate-shake";
  const styleNormal = "border-gray-300";
  const styleConstant =
    "mt-1 px-3 py-2 border rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const estilo = `${styleConstant} ${ancho} ${
    animation ? styleError : styleNormal
  }`;

  useEffect(() => {
    if (errorOnclick) {
      setAnimation(true);
      setError(true);
    } else {
      setAnimation(false);
      setError(false);
    }
  }, [errorOnclick]);
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setIsLoading(true); // Inicia el estado de carga
        const validFiles = type
          ? type
          : ["image/jpeg", "image/png", "image/jpg"];

        if (validFiles.includes(file.type)) {
          // Simula un tiempo de procesamiento del archivo
          setTimeout(() => {
            setForm((prev) => ({ ...prev, [name]: file }));
            setAnimation(false);
            setError(false);
            setErrorMessage(""); // Limpiar mensaje de error
            setIsLoading(false); // Termina el estado de carga
          }, 1000); // Simula un retraso de 1 segundo
        } else {
          setAnimation(true);
          setError(true);
          setErrorMessage("No se permiten otros tipos de archivos");
          setIsLoading(false); // Termina el estado de carga
        }
      } else {
        setAnimation(true);
        setError(true);
        setErrorMessage("Este campo es obligatorio");
      }
    } catch (error) {
      dispatch(setMessage("Error al cargar el archivo", "Error"));
    } 
  };
  const handleBlur = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col mx-3 F h-20">
      <label
        className={`text-base font-medium ${
          error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onBlur={handleBlur}
        onChange={handleChange}
        accept={type ? type : ["image/jpeg", "image/png", "image/jpg"]}
        className={estilo}
        disabled={isLoading} // Deshabilitar mientras está cargando
      />
      {isLoading && (
        <span className="text-blue-500 text-xs">Cargando archivo...</span>
      )}
      {error && (
        <span className="text-red-500 text-xs ">
          {errorMessage || "Este campo es obligatorio"}
        </span>
      )}
    </div>
  );
};

export default InpuFiles;
