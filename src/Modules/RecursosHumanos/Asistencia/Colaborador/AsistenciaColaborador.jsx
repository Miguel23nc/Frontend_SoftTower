import { useEffect, useState } from "react";
import ReporteAsistenciaColaborador from "./Reporte/Resport";
import MarcarAsistencia from "./Permissions/MarcarAsistencia";
import { useAuth } from "../../../../context/AuthContext";
import useref from "../../../../recicle/useRef";
import ListAColaborador from "./List/List";
import RegisterAsistenciaColaborador from "./Register/Register";

const AsistenciaColaborador = () => {
  const { user } = useAuth();
  const [change, setChange] = useState("");

  const hasPermission = () => {
    if (user) {
      const { modules } = user;

      const hasPermission1 = modules?.filter(
        (module) => module.submodule?.name === "ASISTENCIA"
      );
      const hasPermission2 = hasPermission1[0]?.submodule?.permissions;
      return hasPermission2;
    }
  };
  const permissionCreate = hasPermission()?.some(
    (permission) => permission === "CREAR"
  );
  const permissionRead = hasPermission()?.some(
    (permission) => permission === "VER"
  );
  const permissionReport = hasPermission()?.some(
    (permission) => permission === "REPORTAR"
  );
  const permissionEdit = hasPermission()?.some(
    (permission) => permission === "EDITAR"
  );
  const permissionDelete = hasPermission()?.some(
    (permission) => permission === "ELIMINAR"
  );
  const permissionApprove = hasPermission()?.some(
    (permission) => permission === "APROBAR"
  );
  const permissionMarcarAsistencia = hasPermission()?.some(
    (permission) => permission === "MARCAR ASISTENCIA"
  );

  useEffect(() => {
    if (permissionRead) {
      setChange("Listar");
    } else if (permissionCreate) {
      setChange("Crear");
    } else if (permissionReport) {
      setChange("Reporte");
    } else if (permissionMarcarAsistencia) {
      setChange("Marcar Asistencia");
    } else {
      setChange("No hay Opciones Disponibles");
    }
  }, [permissionRead, permissionCreate]);
  let children;
  if (change === "Crear") {
    children = <RegisterAsistenciaColaborador />;
  } else if (change === "Listar") {
    children = (
      <ListAColaborador
        permissionRead={permissionRead}
        permissionEdit={permissionEdit}
        permissionDelete={permissionDelete}
        permissionApprove={permissionApprove}
      />
    );
  } else if (change === "Reporte") {
    children = <ReporteAsistenciaColaborador />;
  } else if (change === "Marcar Asistencia") {
    children = <MarcarAsistencia />;
  } else {
    children = "No hay nada";
  }
  const options = ["Listar", "Crear", "Reporte", "Marcar Asistencia"];
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (option) => {
    setChange(option);
    setIsOpen(false);
  };
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

export default AsistenciaColaborador;
