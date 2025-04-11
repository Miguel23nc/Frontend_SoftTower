import { useNavigate } from "react-router-dom";

const Atajo = ({ name, onclick, ruta, fondo, ...props }) => {
  const navigate = useNavigate();
  const navegar = () => {
    if (!ruta) return;
    const rutaSinEspacios = ruta || "";
    navigate(rutaSinEspacios.toLowerCase());
  };

  return (
    <button
      onClick={onclick || navegar}
      className={` hover:scale-105 bg-cover bg-no-repeat bg-center transition-all h-[250px] duration-300 hover:-rotate-2 m-4 rounded-3xl my-5 border-gray-100 shadow-lg`}
      {...props}
    >
      <div className="flex flex-col text-center items-center justify-center h-full p-5">
        <h2 className="text-[70px] font-bold text-white">
          {/* {name === "Asistencia" ? "" : name} */}
        </h2>
        {/* <p className="text-sm text-white">Es un atajo a {name}</p> */}
      </div>
    </button>
  );
};

export default Atajo;
