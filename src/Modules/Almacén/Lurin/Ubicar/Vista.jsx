import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonOk from "../../../../recicle/Buttons/Buttons";
import AllNaves from "../Ubicar/Naves/All";
import Nave01 from "../Ubicar/Naves/Nave01";
import {
  getAllSedesAlmacen,
  getNaveBySede,
} from "../../../../redux/modules/Almacen/actions";
import { useDispatch, useSelector } from "react-redux";

const VistaGeneral = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const naveParam = searchParams.get("nave") || "TODAS";
  const [naveSeleccionada, setNaveSeleccionada] = useState(naveParam);
  const [naveSeleccionadaId, setNaveSeleccionadaId] = useState("");
  const [navesLurin, setNavesLurin] = useState([]);
  const Sede = "LURIN";
  const allSedesAlmacen = useSelector((state) => state.almacen.allSedes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (allSedesAlmacen.length === 0) {
      dispatch(getAllSedesAlmacen());
    }
  }, [dispatch, allSedesAlmacen.length]);

  const estilos =
    "!w-60 rounded-lg !text-black ease-in-out shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-inner hover:bg-none transition-all duration-300";

  const sedeId = allSedesAlmacen.find((sede) => sede.nombre === Sede);
  const navesBySede = async () => {
    const naves = await getNaveBySede(sedeId._id);
    setNavesLurin(naves); // guarda todos los datos, no solo los nombres
  };
  useEffect(() => {
    if (sedeId) navesBySede();
  }, [sedeId, dispatch]);

  useEffect(() => {
    const nuevaNave = searchParams.get("nave") || "TODAS";
    setNaveSeleccionada(nuevaNave);

    const naveSeleccionadaObj = navesLurin.find((n) => n.nombre === nuevaNave);
    setNaveSeleccionadaId(naveSeleccionadaObj?._id || "");
  }, [searchParams, navesLurin]);

  const seleccionarNave = (nombre) => {
    setNaveSeleccionada(nombre);

    const naveSeleccionadaObj = navesLurin.find((n) => n.nombre === nombre);
    setNaveSeleccionadaId(naveSeleccionadaObj?._id || "");

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("nave", nombre);
      return params;
    });
  };

  const renderContenido = () => {
    switch (naveSeleccionada) {
      case "NAVE-01-LU":
        return <Nave01 naveId={naveSeleccionadaId} />;
      // case "Nave 02":
      //   return <VistaNave02 />;
      // case "Nave 03":
      //   return <VistaNave03 />;
      default:
        return <AllNaves />;
    }
  };

  return (
    <div className="w-full  flex flex-col">
      <div className="flex justify-center flex-wrap gap-4 ">
        {["TODAS", ...navesLurin.map((n) => n.nombre)].map((nombre) => (
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

      <div className=" p-1 h-[1500px] m-4 relative flex justify-center">
        {renderContenido()}
        <div className="border  border-b-0 absolute border-gray-400 bottom-2 opacity-50 w-[20%] h-10 p-4 flex justify-center items-center">
          <span className="text-gray-600 font-semibold">Entrada</span>
        </div>
      </div>
      <div className="  p-1 m-4 flex justify-center">
        <div className="w-full h-full flex flex-col justify-center bg-gray-100 p-4 mb-12 rounded-lg shadow-lg">
          <div>
            <span className="text-blue-500 font-semibold text-xl">
              Stock de {naveSeleccionada}
            </span>
          </div>
          <br />
          <p className="text-gray-400 ">
            Espere, pronto se añadirá esa función
          </p>
        </div>
      </div>
    </div>
  );
};

export default VistaGeneral;
