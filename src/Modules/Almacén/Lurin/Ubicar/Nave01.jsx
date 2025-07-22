import ZonaAlmacen from "../../Almacen/Zona";

const zonas = [
  {
    _id: "zona001",
    nombre: "Zona A",
    orientacion: "HORIZONTAL",
    almacenId: "almacen001",
    xInicio: 1,
    yInicio: 1,
    racks: [
      {
        nombre: "Rack A1",
        niveles: 4,
        seccionesPorNivel: 10,
        secciones: 15,
      },
      {
        nombre: "Rack A2",
        niveles: 4,
        seccionesPorNivel: 12,
      },
    ],
  },
  {
    _id: "zona002",
    nombre: "Zona B",
    orientacion: "VERTICAL",
    xInicio: 15,
    yInicio: 10,
    almacenId: "almacen001",
    racks: [
      {
        nombre: "Rack B1",
        niveles: 3,
        seccionesPorNivel: 16,
      },
      {
        nombre: "Rack B2",
        niveles: 3,
        seccionesPorNivel: 8,
      },
    ],
  },
];

const ubicaciones = [
  {
    _id: "ubicacion002",
    zonaId: "zona001",
    rack: "Rack A1",
    nivel: 1,
    seccion: 2,
    estado: "OCUPADO",
  },
  {
    _id: "ubicacion003",
    zonaId: "zona002",
    rack: "Rack B1",
    nivel: 2,
    seccion: 3,
    estado: "RESERVADO",
  },
  {
    _id: "ubicacion003",
    zonaId: "zona002",
    rack: "Rack B1",
    nivel: 3,
    seccion: 13,
    estado: "RESERVADO",
  },
];

const Nave01 = () => {
  // const UbicacionesByZona = useSelector(
  //   (state) => state.almacen.getUbicacionByParams
  // );
  // const recargar = () => {
  //   dispatch(
  //     getUbicacionByParams({
  //       zona: form.zona,
  //     })
  //   );
  // };
  // useEffect(() => {
  //   if (form.nave && form.zona && findZona && findZona._id) {
  //     recargar();
  //   }
  // }, [findZona._id, dispatch]); // más controlado

  return (
    <div className="w-full h-full flex  justify-center bg-gray-100 p-2 rounded-lg shadow-lg">
      <div
        className="relative grid"
        style={{
          gridTemplateColumns: `repeat(46, calc(100vw / 52))`,
          gridTemplateRows: `repeat(39, calc(100vh / 44))`,
          width: "99%",
          height: "95%",
        }}
      >
        {zonas.map((zona, idx) => (
          <ZonaAlmacen key={idx} zona={zona} ubicaciones={ubicaciones} />
        ))}
      </div>
    </div>
  );
};

export default Nave01;
