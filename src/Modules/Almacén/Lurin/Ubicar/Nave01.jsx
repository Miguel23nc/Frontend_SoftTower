import { useDispatch } from "react-redux";
import { getZonasByParams } from "../../../../redux/modules/Almacen/actions";
import ZonaAlmacen from "../../Almacen/Zona";
import { useEffect, useState } from "react";
import axios from "../../../../api/axios";

const Nave01 = ({ naveId }) => {
  const dispatch = useDispatch();
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo de posiciones por zona
  const posicionesByZona = {
    "ZONA-001": { xInicio: 22, yInicio: 41 },
    "ZONA-002": { xInicio: 40, yInicio: 11 },
    "ZONA-003": { xInicio: 22, yInicio: 1 },
    "ZONA-004": { xInicio: 8, yInicio: 1 },
    "ZONA-005": { xInicio: 1, yInicio: 17 },
    "ZONA-006": { xInicio: 8, yInicio: 40 },
    "ZONA-007": { xInicio: 8, yInicio: 29 },
    "ZONA-008": { xInicio: 22, yInicio: 29 },
    "ZONA-009": { xInicio: 8, yInicio: 18 },
    "ZONA-010": { xInicio: 22, yInicio: 18 },
    "ZONA-011": { xInicio: 9, yInicio: 7 },
    "ZONA-012": { xInicio: 22, yInicio: 7 },
  };

  // Función para cargar ubicaciones por zona
  const cargarUbicacionesPorZona = async (zonaId) => {
    try {
      const params = new URLSearchParams({ zonaId });
      const response = await axios.get(`/getUbicacionByParams?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar ubicaciones para zona ${zonaId}`, error);
      return [];
    }
  };

  // Carga todos los datos necesarios
  const cargarDatos = async () => {
    if (!naveId) return;

    try {
      setLoading(true);
      setError(null);

      // 1. Cargar zonas de la nave
      const zonasData = await getZonasByParams({ nave: naveId });

      // 2. Para cada zona, cargar sus ubicaciones y combinar datos
      const zonasConDatos = await Promise.all(
        zonasData.map(async (zona) => {
          const pos = posicionesByZona[zona.nombre] || { xInicio: 1, yInicio: 1 };
          const ubicaciones = await cargarUbicacionesPorZona(zona._id);

          return {
            ...zona,
            ...pos,
            ubicacionesZona: ubicaciones
          };
        })
      );

      setZonas(zonasConDatos);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("Error al cargar los datos del almacén");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [naveId]);

  return (
    <div className="w-full h-full flex justify-center bg-gray-100 p-2 rounded-lg shadow-lg">
      <div
        className="relative grid"
        style={{
          gridTemplateColumns: `repeat(46, calc(100vw / 52))`,
          gridTemplateRows: `repeat(43, calc(100% / 44))`,
          width: "99%",
          height: "95%",
        }}
      >
        {loading ? (
          <div>Cargando datos del almacén...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          zonas.map((zona, idx) => (
            <ZonaAlmacen
              key={`${zona._id}-${idx}`}
              zona={zona}
              ubicaciones={zona.ubicacionesZona}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Nave01;