import SeccionAlmacen from "./Section";

const ZonaAlmacen = ({ zona, ubicaciones }) => {
  const etiquetaZona =
    zona.orientacion === "HORIZONTAL" ? (
      <div
        key={`zona-${zona._id}`}
        className="text-[17px] font-semibold flex items-center justify-center text-white bg-sky-500"
        style={{
          gridColumnStart: zona.xInicio,
          gridRowStart: zona.yInicio,
          gridColumnEnd:
            zona.xInicio +
            Math.max(...zona.racks.map((r) => r.seccionesPorNivel)) +
            1,
          gridRowEnd: zona.yInicio + 1,
        }}
      >
        {zona.nombre}
      </div>
    ) : (
      <div
        key={`zona-${zona._id}`}
        className="text-[17px] font-semibold flex items-center justify-center text-white bg-sky-500"
        style={{
          gridColumnStart: zona.xInicio + 1,
          gridRowStart: zona.yInicio,
          gridColumnEnd:
            zona.xInicio +
            zona.racks.reduce((acc, rack) => acc + rack.niveles + 1, 0),
          gridRowEnd: zona.yInicio + 1,
        }}
      >
        {zona.nombre}
      </div>
    );

  let acumuladorY = zona.yInicio + 1; // Comienza después de la etiqueta de zona

  const renderRack = (rack, rackIndex) => {
    const niveles = rack.niveles;
    const seccionesPorNivel = rack.seccionesPorNivel;

    const rackOffsetX =
      zona.orientacion === "HORIZONTAL"
        ? zona.xInicio + 1
        : zona.xInicio + 1 + rackIndex * (niveles + 1);

    const rackOffsetY =
      zona.orientacion === "HORIZONTAL" ? acumuladorY : zona.yInicio + 2;

    // Actualiza el acumulador solo para orientación horizontal
    if (zona.orientacion === "HORIZONTAL") {
      acumuladorY += niveles + 1; // niveles + 1 fila de separación
    }

    const celdas = [];

    for (let nivelIdx = 0; nivelIdx < niveles; nivelIdx++) {
      for (let seccionIdx = 0; seccionIdx < seccionesPorNivel; seccionIdx++) {
        const nivel = nivelIdx + 1;
        const seccion = seccionIdx + 1;

        const x =
          zona.orientacion === "HORIZONTAL"
            ? rackOffsetX + seccionIdx
            : rackOffsetX + nivelIdx;

        const y =
          zona.orientacion === "HORIZONTAL"
            ? rackOffsetY + nivelIdx
            : rackOffsetY + seccionIdx;

        const estado =
          ubicaciones.find(
            (u) =>
              u.zonaId === zona._id &&
              u.rack === rack.nombre &&
              u.nivel === nivel &&
              u.seccion === seccion
          )?.estado || "LIBRE";

        celdas.push(
          <div
            key={`rack-${rack.nombre}-${nivel}-${seccion}`}
            style={{
              gridColumnStart: x,
              gridRowStart: y,
            }}
          >
            <SeccionAlmacen nivel={nivel} seccion={seccion} estado={estado} />
          </div>
        );
      }
    }

    const etiquetaRack = (
      <div
        key={`rack-label-${rack.nombre}`}
        className="text-[12px] font-semibold flex items-center justify-center text-white bg-gray-800"
        style={{
          gridColumnStart:
            zona.orientacion === "HORIZONTAL" ? rackOffsetX - 1 : rackOffsetX,
          gridRowStart:
            zona.orientacion === "HORIZONTAL" ? rackOffsetY : zona.yInicio + 1,
          gridColumnEnd:
            zona.orientacion === "HORIZONTAL"
              ? rackOffsetX
              : rackOffsetX + niveles,
          gridRowEnd:
            zona.orientacion === "HORIZONTAL"
              ? rackOffsetY + niveles
              : zona.yInicio + 2,
          ...(zona.orientacion === "HORIZONTAL"
            ? { textAlign: "center", writingMode: "sideways-lr" }
            : {}),
        }}
      >
        {rack.nombre}
      </div>
    );

    return [etiquetaRack, ...celdas];
  };

  return (
    <>
      {etiquetaZona}
      {zona.racks.flatMap((rack, idx) => renderRack(rack, idx))}
    </>
  );
};
export default ZonaAlmacen;
