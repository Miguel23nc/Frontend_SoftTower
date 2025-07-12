import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import AllNaves from "./All";
import Nave01 from "./Nave01";

const VistaGeneral = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const naveParam = searchParams.get("nave") || "Todas"; // Por defecto: Todas
  const [naveSeleccionada, setNaveSeleccionada] = useState(naveParam);

  const estilos =
    "!w-60 rounded-lg !text-black ease-in-out shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-inner hover:bg-none transition-all duration-300";

  const botones = ["Todas", "Nave 01", "Nave 02", "Nave 03"];

  useEffect(() => {
    // Cuando cambia el parámetro en la URL, actualiza el estado
    const nuevaNave = searchParams.get("nave") || "Todas";
    setNaveSeleccionada(nuevaNave);
  }, [searchParams]);

  const seleccionarNave = (nombre) => {
    setNaveSeleccionada(nombre);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("nave", nombre); // Solo cambia 'nave', sin borrar 'select'
      return params;
    });
  };

  const renderContenido = () => {
    switch (naveSeleccionada) {
      case "Nave 01":
        return <Nave01 />;
      // case "Nave 02":
      //   return <VistaNave02 />;
      // case "Nave 03":
      //   return <VistaNave03 />;
      default:
        return <AllNaves />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center flex-wrap gap-4 ">
        {botones.map((nombre) => (
          <ButtonOk
            key={nombre}
            type="ok"
            onClick={() => seleccionarNave(nombre)}
            classe={`${estilos} ${
              naveSeleccionada === nombre
                ? "!bg-gradient-to-tr !from-[#4478b8] !to-[#52a4f0] !text-white"
                : ""
            }`}
          >
            {nombre}
          </ButtonOk>
        ))}
      </div>

      <div className="relative p-1 h-screen m-4 flex justify-center">
        {renderContenido()}
        <div className="border border-b-0 absolute border-gray-400 bottom-2 w-[20%] h-10 p-4 flex justify-center items-center">
          <span className="text-gray-600 font-semibold">Entrada</span>
        </div>
      </div>
      <div className=" relative p-1 m-4 flex justify-center">
        <div className="w-full h-full flex flex-col justify-center bg-gray-100 p-4 mb-12 rounded-lg shadow-lg">
          <div>
            <span className="text-blue-500 font-semibold text-xl">
              Stock de {naveSeleccionada}
            </span>
          </div>
          <br />
          <p className="text-gray-400 ">Espere, pronto se añadirá esa función</p>
        </div>
      </div>
    </div>
  );
};

export default VistaGeneral;
