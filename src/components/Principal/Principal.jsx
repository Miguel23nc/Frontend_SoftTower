import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import RadioOption from "../../recicle/Otros/Radio";

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

export default ReadOrCreate;
