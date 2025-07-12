import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../recicle/Inputs/Inputs";
import ZonaAlmacen from "../../Almacen/Zona";
import { useEffect, useState } from "react";
import {
  getAllNavesAlmacen,
  getAllZonasAlmacen,
} from "../../../../redux/modules/Almacen/actions";

const UbicarProducto = ({ setShowUbicar }) => {
  const dispatch = useDispatch();
  const [findZona, setFindZona] = useState({});
  const [form, setForm] = useState({
    nave: "",
    zona: "",
  });
  const allNaves = useSelector((state) => state.almacen.allNaves);
  const navesNames = allNaves.map((nave) => nave.nombre);
  const allZonas = useSelector((state) => state.almacen.allZonas);
  const zonasNames = allZonas.map((zona) =>
    zona.almacenId.nombre === form.nave ? zona.nombre : ""
  );
  useEffect(() => {
    if (allNaves.length === 0) {
      dispatch(getAllNavesAlmacen());
    }
    if (allZonas.length === 0) {
      dispatch(getAllZonasAlmacen());
    }
  }, [dispatch, allNaves.length, allZonas.length]);

  const buscar = (zonasName) => {
    const zona = allZonas.find((z) => z.nombre === zonasName);
    if (zona) {
      setFindZona(zona);
    } else {
      setFindZona({});
    }
  };

  useEffect(() => {
    if (form.nave && form.zona) {
      buscar(form.zona);
    } else {
      setFindZona({});
    }
  }, [form.nave, form.zona]);

  const zona = {
    ...findZona,
    xInicio: 1,
    yInicio: 1,
  };
  const ubicaciones = [
    {
      _id: "ubicacion005",
      zonaId: "zona005",
      rack: "Rack 05-A",
      nivel: 2,
      seccion: 1,
      estado: "OCUPADO",
    },
  ];
  const Cancelar = () => {
    setShowUbicar(false);
  };

  const esVertical = zona.orientacion === "VERTICAL";

  let totalColumnas, totalFilas;
  if (Object.keys(findZona)?.length > 0) {
    if (esVertical) {
      totalColumnas =
        zona.xInicio +
        zona.racks.reduce((acc, rack) => acc + rack.niveles + 1, 0);
      totalFilas =
        zona.yInicio +
        Math.max(...zona.racks.map((rack) => rack.seccionesPorNivel)) +
        1;
    } else {
      totalColumnas =
        zona.xInicio +
        Math.max(...zona.racks.map((rack) => rack.seccionesPorNivel)) +
        0;
      totalFilas =
        zona.yInicio +
        zona.racks.reduce((acc, rack) => acc + rack.niveles + 1, 0);
    }
  }

  return (
    <div
      className="fixed top-0 z-[90] left-0 right-0 bottom-0 flex 
    justify-center items-center  "
    >
      <div className="flex flex-col justify-center items-center bg-white  p-2 rounded-lg shadow-lg min-w-[50%] min-h-[65%]">
        <span className="text-center font-medium text-red-500 p-3 text-6xl">
          Ubicar
        </span>
        <div className="flex justify-around my-1">
          <Input
            label="Nave"
            name="nave"
            type="select"
            value={form.nave}
            setForm={setForm}
            options={navesNames}
          />
          <Input
            label="Zona"
            name="zona"
            type="select"
            value={form.zona}
            setForm={setForm}
            options={zonasNames}
          />
        </div>
        <div className="bg-green-50 rounded-xl p-3 m-3 ">
          {Object.keys(findZona)?.length > 0 && (
            <div
              className="relative grid"
              style={{
                gridTemplateColumns: `repeat(${totalColumnas}, calc(100vw / ${
                  totalColumnas + 17
                }))`,
                gridTemplateRows: `repeat(${totalFilas}, calc(100vh / ${
                  totalFilas + 16
                }))`,
              }}
            >
              <ZonaAlmacen zona={zona} ubicaciones={ubicaciones} />
            </div>
          )}
        </div>
        <div className="flex justify-around items-center w-full m-3 p-2">
          <button className="text-white font-medium bg-blue-500 w-4/12 rounded-lg p-3  ">
            Guardar
          </button>
          <button
            onClick={Cancelar}
            className="text-white font-medium bg-red-500 w-4/12 rounded-lg p-3  "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UbicarProducto;
