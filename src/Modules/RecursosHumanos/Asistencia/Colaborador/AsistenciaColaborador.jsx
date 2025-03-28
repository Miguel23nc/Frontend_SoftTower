import { useEffect, useState } from "react";
import ReporteAsistenciaColaborador from "./Reporte/Resport";
import MarcarAsistencia from "./Permissions/MarcarAsistencia";
import { useAuth } from "../../../../context/AuthContext";
import ListAColaborador from "./List/List";
import RegisterAsistenciaColaborador from "./Register/Register";
import RadioOption from "../../../../recicle/Otros/Radio";

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
  const handleOptionClick = (option) => {
    setChange(option);
  };
  return (
    <div className="w-full">
      <div className="flex justify-center items-center pt-10">
        <RadioOption
          opciones={options}
          selectedOption={change}
          onChange={handleOptionClick}
        />
      </div>
      {children}
    </div>
  );
};

export default AsistenciaColaborador;
