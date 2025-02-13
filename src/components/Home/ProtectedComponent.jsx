import { Navigate } from "react-router-dom";
import useModulesAndSubModules from "../SideBar/Links";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading/Loading";

const ProtectedComponent = ({ allowedSubmodules, children }) => {
  const { user } = useAuth();
  const { links: userPermissions, loading } = useModulesAndSubModules();

  if (!user) {
    return <div>No autorizado o usuario no encontrado.</div>;
  }

  if (loading) {
    return <Loading />;
  }
  const hasAccess = userPermissions.some((module) =>
    module.submodule.some((submodule) =>
      allowedSubmodules.includes(submodule.toLowerCase())
    )
  );

  return hasAccess ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedComponent;
