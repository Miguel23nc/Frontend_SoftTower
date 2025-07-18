import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../recicle/Inputs/Inputs";
import ZonaAlmacen from "../../Almacen/Zona";
import { useEffect, useState } from "react";
import {
  getAllNavesAlmacen,
  getAllZonasAlmacen,
  getUbicacionByParams,
} from "../../../../redux/modules/Almacen/actions";
import { useLocation } from "react-router";

const UbicarProducto = ({ ubicar, reservados, setReservados }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const afterAlmacen = location.pathname.split("/almacen/")[1] || "";
  const UbicacionesByZona = useSelector(
    (state) => state.almacen.getUbicacionByParams
  );

  const [findZona, setFindZona] = useState({});
  const [form, setForm] = useState({
    nave: "",
    zona: "",
  });
  const allNaves = useSelector((state) => state.almacen.allNaves);

  const NavesBySede = allNaves.filter(
    (nave) => nave.sedeId.nombre === afterAlmacen.toUpperCase()
  );

  const navesNames = NavesBySede?.map((nave) => nave.nombre);
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
  }, [form.nave, form.zona, dispatch]);
  useEffect(() => {
    if (form.nave && form.zona && Object.keys(findZona).length > 0) {
      dispatch(
        getUbicacionByParams({
          zona: form.zona,
        })
      );
    }
  }, [form.nave, form.zona, dispatch, findZona]);

  const zona = {
    ...findZona,
    xInicio: 1,
    yInicio: 1,
  };
  const [ubicacionActiva, setUbicacionActiva] = useState(null);
  const esVertical = zona.orientacion === "VERTICAL";
  const handleConfirmarUbicaciones = () => {
    const sinCantidad = reservados.find((r) => !r.cantidad);
    if (sinCantidad) {
      alert(
        `Falta ingresar cantidad para la ubicación: Nivel ${sinCantidad.nivel}, Sección ${sinCantidad.seccion}, Rack ${sinCantidad.rack}`
      );
      setUbicacionActiva(
        `${sinCantidad.nivel}-${sinCantidad.seccion}-${sinCantidad.rack}`
      );
      return;
    }

    ubicar(reservados);
  };

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
  const ubicacionesCombinadas = [
    ...UbicacionesByZona.filter((u) => {
      const clave = `${u.nivel}-${u.seccion}-${u.rack}`;
      return !reservados.find(
        (r) => `${r.nivel}-${r.seccion}-${r.rack}` === clave
      );
    }),
    ...reservados,
  ];
  const [cantidadTemp, setCantidadTemp] = useState("");
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
        {ubicacionActiva && (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex justify-center items-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
              <h3 className="text-lg font-semibold mb-2">
                Cantidad para la ubicación
              </h3>
              <input
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full border p-2 rounded mb-3"
                placeholder="Ingrese cantidad"
                onChange={(e) => setCantidadTemp(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                onClick={() => {
                  const cantidadNum = Number(cantidadTemp);
                  if (!cantidadTemp || isNaN(cantidadNum) || cantidadNum <= 0) {
                    alert("Ingrese una cantidad válida mayor que cero");
                    return;
                  }

                  setReservados((prev) =>
                    prev.map((u) =>
                      `${u.nivel}-${u.seccion}-${u.rack}` === ubicacionActiva
                        ? { ...u, cantidad: cantidadNum }
                        : u
                    )
                  );
                  setCantidadTemp("");
                  setUbicacionActiva(null);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        <div className="bg-green-50 rounded-xl p-3 m-3 flex">
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
              <ZonaAlmacen
                zona={zona}
                ubicaciones={ubicacionesCombinadas}
                onclick={(nivel, seccion, estado, rack) => {
                  const clave = `${nivel}-${seccion}-${rack}`;
                  const yaReservado = reservados?.find(
                    (r) => `${r.nivel}-${r.seccion}-${r.rack}` === clave
                  );

                  if (estado === "OCUPADO") return;

                  if (yaReservado) {
                    // Si ya está reservada, la quitamos
                    setReservados((prev) =>
                      prev.filter(
                        (r) => `${r.nivel}-${r.seccion}-${r.rack}` !== clave
                      )
                    );
                  } else {
                    // Si no está, la agregamos y mostramos input de cantidad
                    const nuevaUbicacion = {
                      zonaId: zona._id,
                      nave: zona.almacenId.nombre,
                      zona: zona.nombre,
                      rack,
                      nivel,
                      seccion,
                      estado: "RESERVADO",
                      cantidad: null,
                    };
                    setReservados((prev) => [...prev, nuevaUbicacion]);
                    setUbicacionActiva(`${nivel}-${seccion}-${rack}`);
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-around items-center w-full m-3 p-2">
          <button
            className="text-white font-medium bg-blue-500 w-4/12 rounded-lg p-3 "
            onClick={handleConfirmarUbicaciones}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UbicarProducto;
