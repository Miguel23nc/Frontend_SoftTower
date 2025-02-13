import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import List from "../Clientes/List/List";
import Register from "../Clientes/Register/Register";

const Clientes = () => {
  const { user } = useAuth();
  const hasPermission = () => {
    if (user) {
      const { modules } = user;
      const hasPermission1 = modules?.filter(
        (module) => module.submodule.name === "Clientes"
      );
      const hasPermission2 = hasPermission1[0].submodule.permissions;
      return hasPermission2;
    }
  };

  const permissionCreate = hasPermission().some(
    (permission) => permission === "write"
  );
  const permissionRead = hasPermission().some(
    (permission) => permission === "read"
  );
  const permissionEdit = hasPermission().some(
    (permission) => permission === "update"
  );
  const permissionDelete = hasPermission().some(
    (permission) => permission === "delete"
  );
  useEffect(() => {
    permissionRead ? setCahnge("Listar") : setCahnge("Crear");
  }, [permissionRead, permissionCreate]);
  const [change, setCahnge] = useState("");
  const handleSelect = (e) => {
    const { value } = e.target;
    setCahnge(value);
  };

  return (
    <div className="w-full" >
      <div className="flex justify-start  pt-2 px-14">
        <select
          id="1"
          onChange={handleSelect}
          value={change}
          className="bg-slate-300 outline-none px-6 p-3 mt-6 mr-3 rounded-xl"
        >
          {permissionRead ? <option value="Listar">Listar</option> : null}
          {permissionCreate ? <option value="Crear">Crear</option> : null}
        </select>
      </div>

      {change === "Crear" ? (
        <Register />
      ) : (
        <List
          permissionRead={permissionRead}
          permissionEdit={permissionEdit}
          permissionDelete={permissionDelete}
        />
      )}
    </div>
  );
};

export default Clientes;
