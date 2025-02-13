import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { use } from "react";
import useref from "../../recicle/useRef";

const ReadOrCreate = ({ ItemRegister, ItemList, ItemReporte, submodule }) => {
  const { user } = useAuth();

  const hasPermission = () => {
    if (user) {
      const { modules } = user;

      const hasPermission1 = modules?.filter(
        (module) => module.submodule?.name === submodule
      );
      const hasPermission2 = hasPermission1[0]?.submodule?.permissions;
      return hasPermission2;
    }
  };
  console.log("hasPermission", hasPermission());

  const permissionCreate = hasPermission()?.some(
    (permission) => permission === "CREAR"
  );
  const permissionRead = hasPermission()?.some(
    (permission) => permission === "VER"
  );
  const permissionEdit = hasPermission()?.some(
    (permission) => permission === "EDITAR"
  );
  const permissionDelete = hasPermission()?.some(
    (permission) => permission === "ELIMINAR"
  );
  const permissionReport = hasPermission()?.some(
    (permission) => permission === "REPORTAR"
  );
  const permissionApprove = hasPermission()?.some(
    (permission) => permission === "APROBAR"
  );
  useEffect(() => {
    if (permissionRead) {
      setCahnge("Listar");
    } else if (permissionCreate) {
      setCahnge("Crear");
    } else if (permissionReport) {
      setCahnge("Reporte");
    } else {
      setCahnge("No hay Opciones Disponibles");
    }
  }, [permissionRead, permissionCreate]);
  const [change, setCahnge] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (permissionRead) {
      setOptions((prev) => [...prev, "Listar"]);
    }
    if (permissionCreate) {
      setOptions((prev) => [...prev, "Crear"]);
    }
    if (permissionReport) {
      setOptions((prev) => [...prev, "Reporte"]);
    }
  }, [permissionRead, permissionCreate, permissionReport]);
  const handleOptionClick = (option) => {
    setCahnge(option);
    setIsOpen(false);
  };

  let children;
  if (change === "Crear") {
    children = <ItemRegister />;
  } else if (change === "Listar") {
    children = (
      <ItemList
        permissionRead={permissionRead}
        permissionEdit={permissionEdit}
        permissionDelete={permissionDelete}
        permissionApprove={permissionApprove}
      />
    );
  } else if (change === "Reporte") {
    children = <ItemReporte />;
  } else {
    children = "No hay nada";
  }
  const refselect = useref(setIsOpen);
  return (
    <div className="w-full">
      <div ref={refselect} className="flex flex-col justify-start  pt-2 px-14">
        <div
          className=" w-40 flex justify-between items-center bg-gray-100 border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className=" font-medium">{change || "Select Options"}</span>
          <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
        </div>

        {isOpen && (
          <ul className="mt-2 w-40 absolute top-32  bg-white border border-gray-300 rounded-md shadow-md z-10">
            {options.map((option, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-4 py-2 cursor-pointer 
                ${
                  change === option
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <span className=" font-medium ">{option}</span>
                {change === option && (
                  <i
                    className="pi pi-check"
                    style={{ color: "white", fontSize: "1rem" }}
                  ></i>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {children}
    </div>
  );
};

export default ReadOrCreate;
