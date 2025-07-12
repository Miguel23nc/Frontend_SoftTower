const SeccionAlmacen = ({ nivel, seccion, estado }) => {
  const colores = {
    LIBRE: "bg-blue-00  text-blue-400 hover:bg-white",
    OCUPADO: "bg-red-500 text-white ",
    MANTENIMIENTO: "bg-orange-500 text-white",
    RESERVADO: "bg-yellow-400 text-white",
    PENDIENTE: "bg-gray-500 text-black",
  };
  //codigo para que tenga un onclick1 que muestre los productos que están en esa sección, y en caso recibe un onclick2 por props, poner ese onclick2
  return (
    <button
      title={`Nivel ${nivel}, Sección ${seccion}, Estado: ${estado}`}
      className={`h-full w-full  border text-[12px] hover:scale-110 transition-all duration-75 flex items-center rounded-md justify-center ${
        colores[estado] || "bg-gray-300"
      }`}
    >
      {nivel}-{seccion}
    </button>
  );
};

export default SeccionAlmacen;
