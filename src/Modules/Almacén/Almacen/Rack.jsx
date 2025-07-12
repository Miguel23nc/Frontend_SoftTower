import SectionAlmacen from "./Section";

const RackAlmacen = ({ rack, ubicaciones }) => {
  const columnas = rack.columnas;
  const filas = rack.filas;

  return (
    <div className="p-2 bg-gray-200 rounded">
      <p className="text-xs font-semibold mb-1">{rack.nombre}</p>
      <div className="flex flex-col gap-[2px]">
        {Array.from({ length: filas }).map((_, filaIdx) => (
          <div key={filaIdx} className="flex gap-[2px]">
            {Array.from({ length: columnas }).map((_, colIdx) => {
              const estadoUbicacion =
                ubicaciones.find(
                  (u) =>
                    u.rack === rack.nombre &&
                    u.nivel === filaIdx + 1 &&
                    u.seccion === colIdx + 1
                )?.estado || "LIBRE";

              return (
                <SectionAlmacen
                  key={colIdx}
                  nivel={filaIdx + 1}
                  seccion={colIdx + 1}
                  estado={estadoUbicacion}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RackAlmacen;
