import { useAuth } from "../../context/AuthContext";
import RegisterAsistencia from "./Register/Register";

const MarcarAsistencia = () => {
  const { user } = useAuth();

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
  const permissionMarcarAsistencia = hasPermission()?.some(
    (permission) => permission === "MARCAR ASISTENCIA"
  );
  console.log("user", user);

  console.log("permissionMarcarAsistencia", permissionMarcarAsistencia);

  if (permissionMarcarAsistencia === true) {
    return <RegisterAsistencia />;
  } else {
    return <h1>No tienes permiso para marcar asistencia</h1>;
  }
};
export default MarcarAsistencia;
