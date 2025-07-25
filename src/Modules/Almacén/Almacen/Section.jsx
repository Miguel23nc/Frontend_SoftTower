const SeccionAlmacen = ({ nivel, seccion, estado, onclick }) => {
  const colores = {
    LIBRE: "bg-blue-00  text-blue-400 hover:bg-white",
    OCUPADO: "bg-red-500 text-white ",
    "PARCIALMENTE OCUPADO": "bg-orange-500 text-white",
    RESERVADO: "bg-yellow-400 text-white",
    PENDIENTE: "bg-gray-500 text-black",
  };

  return (
    <button
      onClick={() => onclick(nivel, seccion, estado)}
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
